import ajaxRequest from "../assets/ajaxRequest.js";
let item = {
  id: parseInt($(".info-container").data("id")),
  itemQuantity: parseInt($("#item_quantity").data("item-quantity")),
  itemPrice: parseFloat($("#price").data("price")),
  price: parseFloat($("#price").data("price")),
  quantity: parseInt($("#quantity_count").text())
};

const init = () => {
  // QUANTITY COUNTER
  $("#add_qty").click(function () {
    item.quantity = parseInt($("#quantity_count").text());

    if (item.quantity < item.itemQuantity) {
      $("#quantity_count").text(item.quantity + 1);
      item.itemPrice = (item.quantity + 1) * item.price;
      $("#price").text("PHP " + item.itemPrice.toFixed(2));
    }
  });

  $("#sub_qty").click(function () {
    item.quantity = parseInt($("#quantity_count").text());
    if (item.quantity > 1) {
      $("#quantity_count").text(item.quantity - 1);
      item.itemPrice = (item.quantity - 1) * item.price;
      $("#price").text("PHP " + item.itemPrice.toFixed(2));
    }
  });
};

// POST CART
$(document).on("click", "#cart-add", function () {
  const token = document.querySelector('meta[name="api-token"]').getAttribute("content");
  var data = new FormData();
  data.append("product_id", item.id);
  data.append("quantity", item.quantity);
  // console.log(data);

  ajaxRequest.post({
    url: "/api/cart",
    data: data,
    token: token,
    onSuccess: response => {
      Swal.fire({
        title: "Success",
        text: "This item has been added to cart.",
        icon: "success",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "View Cart"
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = "/cart";
        }
      });
    },
    onError: response => {
      Swal.fire("Oops!", "Something went wrong. Please contact us", "error").then(() => {
        window.location.href = "/products";
      });
      return;
    }
  });
});

$(document).ready(function () {
  init();
});
