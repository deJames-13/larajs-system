import ajaxRequest from "../assets/ajaxRequest.js";
import OrderItem from "../components/OrderItem.js";

const products = [];
let user = [];

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
      console.log(data);

      user = data;
      data = data.products.data;

      data.forEach(product => {
        product.quantity = product.item_quantity;
        product.total = product.total;

        if (selectedCartId && selectedCartId.includes(product.id)) products.push(product);
        else if (!selectedCartId) products.push(product);
      });

      if (!products.length) window.location.href = "/";

      // console.log(products);
      // RENDER CART
      products.forEach(product => {
        const cartItem = new OrderItem(product);
        $("#cart-body").append(cartItem.render());

        const subtotal = products.reduce((acc, product) => acc + product.total, 0);
        $("#subtotal, #total").text(subtotal.toFixed(2));
      });
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
    customer_info: formData
  };
  console.log(payload);

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

$(document).ready(function () {
  fetchItems().then(() => {
    $("[data-shipping-select]:first").click();
  });

  $("#billing-form").on("submit", e => {
    handleSubmit(e);
  });
});
