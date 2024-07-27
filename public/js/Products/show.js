import ajaxRequest from "../assets/ajaxRequest.js";
import Login from "../Auth/Login.js";
import Carousel from "../components/Carousel.js";
import Ratings from "../components/Ratings.js";

let item = {
  ...product,
  id: parseInt($(".info-container").data("id")),
  itemQuantity: parseInt($("#item_quantity").data("item-quantity")),
  itemPrice: parseFloat($("#price").data("price")),
  price: parseFloat($("#price").data("price")),
  quantity: parseInt($("#quantity_count").text())
};
let carousel = null;
let images = item.images.map(image => "/" + image.path) || ["https://placehold.co/400x600?text=item"];

// console.log(item);

const loadCarousel = () => {
  carousel = new Carousel({
    id: "item-carousel",
    images: images
  });
};

const makeCategoryPills = categories => {
  const pills = [];
  categories.forEach(category => {
    const pill = /* HTML */ ` <span class="bg-primary text-white font-bold px-2 py-1 text-xs rounded-full">${category.name}</span> `;
    pills.push(pill);
  });
  $("#categories-wrapper").html(pills.join(""));
};

const init = () => {
  // QUANTITY COUNTER
  $("#add_qty").click(function () {
    item.quantity = parseInt($("#quantity_count").text());

    if (item.quantity < item.itemQuantity) {
      $("#quantity_count").text(item.quantity + 1);
      item.itemPrice = (item.quantity + 1) * item.price;
      $("#price").text(item.itemPrice.toFixed(2));
    }
  });
  $(".prev").click(() => {
    if (carousel) carousel.prev();
  });

  $(".next").click(() => {
    if (carousel) carousel.next();
  });

  $("#sub_qty").click(function () {
    item.quantity = parseInt($("#quantity_count").text());
    if (item.quantity > 1) {
      $("#quantity_count").text(item.quantity - 1);
      item.itemPrice = (item.quantity - 1) * item.price;
      $("#price").text(item.itemPrice.toFixed(2));
    }
  });

  loadCarousel();
  makeCategoryPills(item.categories);
  new Ratings({
    productId: item.id,
    target: "#product-ratings-wrapper"
  });
};

const updateCart = () => {
  let cartQty = parseInt($(".cart-count").text());
  $(".cart-count").text(parseInt(cartQty + item.quantity));

  let cartTotal = parseFloat($("#cart-total").text());
  $("#cart-total").text((cartTotal + item.itemPrice).toFixed(2));
  $(".indicator").addClass("animate__bounceIn");

  setTimeout(() => {
    $(".indicator").removeClass("animate__bounceIn");
  }, 500);
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
      updateCart();
      Swal.fire({
        title: "Success",
        text: "This item has been added to cart.",
        icon: "success",
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: "View Cart"
      }).then(result => {
        if (result.isConfirmed) {
          window.location.href = "/profile?nav=cart";
        }
      });
    },
    onError: error => {
      console.error(error);
      if (error.status === 401)
        Swal.fire({
          title: "We don't know you",
          text: "Please login to continue.",
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Login",
          cancelButtonText: "Cancel"
        }).then(result => {
          if (result.isConfirmed) {
            modal = new Login();
          }
        });
    }
  });
});

$(document).ready(function () {
  init();
});
