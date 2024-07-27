import ajaxRequest from "../assets/ajaxRequest.js";
import User from "../Users/index.js";
var user = null;
const showLoader = () => {
  $(".search-loader").show();
};
const hideLoader = () => {
  $(".search-loader").hide();
};

const fetchAutoComplete = term => {
  showLoader();
  return ajaxRequest.get({
    url: `/api/autocomplete?term=${term}`,
    onSuccess: response => {
      hideLoader();
    },
    onError: error => {
      console.log(error);
      hideLoader();
    },
    showLoader: false
  });
};

const searchSuggestion = async term => {
  // console.log(term);
  try {
    const data = await fetchAutoComplete(term);
    // console.log(data);
    return data || [];
  } catch (error) {
    console.error("Failed to fetch autocomplete data:", error);
    return [];
  }
};

const handleAutoComplete = () => {
  if (!$("#search-input").length) return;
  $("#search-input")
    .autocomplete({
      source: function (request, response) {
        searchSuggestion(request.term)
          .then(data => {
            response(data);
          })
          .catch(error => {
            console.error("Error fetching autocomplete suggestions:", error);
            response([]);
          });
      },
      delay: 500,
      minLength: 3
    })
    .data("ui-autocomplete")._renderItem = function (ul, item) {
    item.label = item.label.length > 50 ? item.label.substring(0, 50) + "..." : item.label;

    switch (item.type) {
      case "category":
        item.url = `/categories/${item.id}`;
        break;
      case "promos":
        item.url = `/promos/${item.id}`;
        break;
      default:
        item.url = `/${item.type}s/${item.id}`;
        break;
    }

    return $("<li>")
      .addClass("cursor-pointer hover:bg-primary hover:bg-opacity-10 hover:scale-105 transition-all ease-in")
      .append(
        `
                <a href="${item.url || "#"}" class="autocomplete-item">
                    <div class="autocomplete-label font-bold">${item.label}</div>
                    <div class="type text-xs font-light text-ellipsis uppercase">From: ${item.type}</div>
                </a>
                `
      )
      .appendTo(ul);
  };
};

$(document).ready(function () {
  $("#search-button").on("click", () => {
    const search = $("#search-input").val();
    if (search) window.location.href = `/search?q=${search}`;
  });

  $(window).scroll(function () {
    var currentScroll = $(this).scrollTop();

    const headerHeight = $("header").height();
    if (currentScroll > headerHeight) {
      $("#search-bar").slideUp();
    } else {
      $("#search-bar").slideDown();
    }
  });
  hideLoader();
  handleAutoComplete();
  uiRules();
  if (window.location.pathname.includes("/profile")) return;
  new User().init().then(response => {
    user = response;
    // console.log(response);
    if (!user) return;
    const imgSrc = (user.images && user.images.length > 0 && user.images[0].path) || "https://via.placeholder.com/150";
    $("#profile-image").attr("src", imgSrc);

    const cart = user.products || [];
    // console.log(cart);
    const cartCount = cart.length;
    const cartTotal = cart.reduce((acc, curr) => acc + parseFloat(curr.price * cart.pivot.quantity), 0);

    $(".cart-count").text(cartCount);
    $(".cart-total").text(`P${cartTotal.toFixed(2).toLocaleString()}`);
  });
});

const uiRules = () => {
  if (window.location.pathname === "/login" || window.location.pathname === "/register") $(".auth-dropdown").hide();
  // if in dashboard remove #shop-navigation
  if (window.location.pathname.includes("/dashboard")) $("#shop-navigation").remove();
};
