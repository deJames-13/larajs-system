import ajaxRequest from "../assets/ajaxRequest.js";
import OrderItem from "../components/OrderItem.js";
import DiscountSelection from "./_discount_selection.js";

const products = [];
let selectDiscounts = null;
let user = [];
let discounts = [];
let currentPromo = null;

const isValid = () => {
  if ($("#billing-form").valid()) return true;
  Swal.fire({
    title: "Error!",
    text: "Please fill in all required fields.",
    icon: "error",
    confirmButtonText: "OK"
  });
  return false;
};

const validateForm = () => {
  var rules = {};
  var messages = {};
  for (var key in { ...formData, ...address }) {
    rules[key] = { required: true };
    messages[key] = { required: "This field is required." };
  }

  $("#billing-form").validate({
    rules: rules,
    messages: messages,
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("text-red-500 text-sm");
      error.insertAfter(element);
    }
  });
};

const checkout = payload => {
  // clear errors
  $("input").removeClass("border-red-400 border-2");
  $(".address-field").addClass("hidden");
  const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

  ajaxRequest.post({
    url: "/api/orders/checkout",
    data: payload,
    token: token,
    onSuccess: (res, status, error) => {
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then(result => {
        if (result.isConfirmed) {
          sessionStorage.removeItem("cart");
          window.location.href = "/profile?nav=orders";
        }
      });
    },
    onError: (res, status, error) => {
      console.log({
        res,
        status,
        error
      });
      if (res.status === 422) {
        const errors = res.responseJSON.errors;
        Object.keys(errors).forEach(key => {
          let field = `${key}`.split(".")[1];
          $(`input[name=${field}]`).addClass("border-red-400 border-2");
          $(`#${key}-error`).text(errors[key][0]);

          // if key is address show address fields
          if (key.includes("address")) $(`.address-field`).removeClass("hidden");
        });
      }
    }
  });
};

const fetchItems = () => {
  let selectedCartId = sessionStorage.getItem("cart");

  // GET CART
  const token = document.querySelector('meta[name="api-token"]').getAttribute("content");
  return ajaxRequest.get({
    url: "/api/cart",
    token: token,
    onSuccess: ({ data }) => {
      $("#form-submit").show();
      // console.log(data);

      user = data;
      discounts = data.products.promos;
      data = data.products.data;

      data.forEach(product => {
        product.quantity = product.item_quantity;
        product.total = product.total;

        if (selectedCartId && selectedCartId.includes(product.id)) products.push(product);
        else if (!selectedCartId) products.push(product);
        else discounts = discounts.filter(discount => discount.product_id != product.id);
      });

      if (!products.length) window.location.href = "/";

      // console.log(products);
      // RENDER CART
      products.forEach(product => {
        const cartItem = new OrderItem(product);
        $("#cart-body").append(cartItem.render());
      });

      const subtotal = products.reduce((acc, product) => acc + product.total, 0);
      $("#subtotal").text(subtotal.toFixed(2));
    }
  });
};

const handleSubmit = e => {
  e.preventDefault();
  validateForm();
  if (!isValid()) return;
  const addressInfo = Object.values(address)
    .map(value => (value ? value : "N/A"))
    .join(", ");
  formData.address = addressInfo;

  const payload = {
    shipping_address: address,
    shipping_cost: $("#shipping_cost").val(),
    shipping_type: $("#shipping_type").val(),
    products: products.map(product => ({
      id: product.id,
      quantity: product.quantity
    })),
    customer_info: formData,
    promo_id: currentPromo?.id
  };


  // Confirm
  Swal.fire({
    title: "Place Order.",
    text: "Are you sure you want to place this order?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, proceed!"
  }).then(result => {
    if (result.isConfirmed) {
      checkout(payload);
    }
  });
};

const handleSelect = promo => {
  if (!promo?.value) return $(".discount-info-wrapper").hide();
  $(".discount-info-wrapper").show();
  currentPromo = promo;

  let discount = parseInt(promo.discount);
  let shipping = parseFloat($("#shipping_cost").val());
  let subtotal = products.reduce((acc, product) => acc + product.total, 0);
  let total = subtotal + shipping;

  let discountSubtotal = subtotal;
  let discountShipping = shipping;

  switch (promo.promo_for) {
    case "shipping":
      discount = promo.promo_type == "percentage" ? (shipping * discount) / 100 : discount;
      discountShipping = shipping - discount;
      break;
    case "order":
      discount = promo.promo_type == "percentage" ? (subtotal * discount) / 100 : discount;
      discountSubtotal = subtotal - discount;
      break;
    case "product":
      const product = products.find(product => product.id == promo?.product_id);
      if (!product) return;
      discount = promo.promo_type === "percentage" ? (product.total * discount) / 100 : discount;
      discountSubtotal = subtotal - discount;
      break;
  }

  total = discountSubtotal + discountShipping;
  console.log({ discount, subtotal, shipping, total });

  $("#subtotal").text(subtotal.toFixed(2));
  $(".total").text(total.toFixed(2));
  $("#shipping_cost").val(shipping.toFixed(2));

  const discountText = promo.promo_type === "percentage" ? `${promo.discount}%` : `PHP ${parseFloat(promo.discount).toFixed(2)} ` + `off for ${promo.promo_for}`;
  $("#discount-label").text(discountText);
  $("#discount-value").text(parseFloat(discount).toFixed(2));
};

$(document).ready(function () {
  fetchItems().then(() => {
    $("[data-shipping-select]:first").click();
    $("[data-shipping-select]").on("click", () => {
      handleSelect(currentPromo);
    });
    selectDiscounts = new DiscountSelection({
      name: "discounts",
      target: $("#discounts-select"),
      placeholder: "Select: ",
      placeholderLabel: "No discounts selected",
      options: discounts || [],
      selected: {},
      onSelect: handleSelect
    });
  });

  $("#billing-form").on("submit", e => {
    handleSubmit(e);
  });
});
