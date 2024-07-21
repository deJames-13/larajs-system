import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";
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

console.log(item);

const loadCarousel = () => {
  carousel = new Carousel({
    id: "item-carousel",
    images: images
  });
};

const makeRatings = ratings => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const star = /* HTML */ ` <i class="fas fa-star ${i < ratings.average ? "text-primary" : ""}"></i> `;
    stars.push(star);
  }
  const HTML = /*HTML*/ `
    <!-- Ratings -->
    <div class="flex items-center space-x-1 my-2">
      <!-- Starts -->
      <div class="flex items-center text-secondary">${stars.join("")}</div>
      <p class="text-xs"><span class="text-primary font-bold">${ratings.average}</span> (${ratings.count})</p>
    </div>
  `;
  $("#ratings-wrapper").html(HTML);
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

  $("#sub_qty").click(function () {
    item.quantity = parseInt($("#quantity_count").text());
    if (item.quantity > 1) {
      $("#quantity_count").text(item.quantity - 1);
      item.itemPrice = (item.quantity - 1) * item.price;
      $("#price").text(item.itemPrice.toFixed(2));
    }
  });

  loadCarousel();
  makeRatings(item.ratings);
  makeCategoryPills(item.categories);
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
