import ajaxRequest from "../assets/ajaxRequest.js";
import { CartItem } from "../components/CartItem.js";

export default class Cart {
  constructor() {
    this.products = [];
    this.init();
  }

  checkCart(data) {
    if (sessionStorage.getItem("cart")) {
      sessionStorage.removeItem("cart");
    }

    $("#checkout").show();
    data &&
      data.forEach(product => {
        product.total = product.price * product.item_quantity;
        product.quantity = product.item_quantity;
        this.products.push(product);
      });
    if (this.products.length === 0) {
      $("#cart-body").append('<tr><td colspan="6" class="text-center">No items in cart</td></tr>');
      $("#cart-upd").hide();
      $("#subtotal, #total").text("0.00");
      $("#checkout").hide();

      Swal.fire({
        title: "Cart is Empty!",
        text: "Please add items to your cart.",
        icon: "warning",
        confirmButtonColor: "#3085d6"
      }).then(() => {
        // window.location.href = '/';
      });
    }
  }

  onDelete(id) {
    ajaxRequest.delete({
      url: `/api/cart/${id}`,
      onSuccess: response => {
        // console.log(response);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        $("#cart_item_" + id).remove();
        const subtotal = this.products.reduce((acc, product) => acc + product.total, 0);
        $("#subtotal, #total").text(subtotal.toFixed(2));
        this.checkCart(response?.data);
      },
      onError: response => {
        console.log(response);
      }
    });
  }

  fetchItems() {
    ajaxRequest.get({
      url: "/api/cart",
      onSuccess: (response, status, error) => {
        var data = response.data;
        this.checkCart(data);
        // console.log(products);

        this.products.forEach(product => {
          const cartItem = new CartItem(product);
          $("#cart-body").append(cartItem.render());

          const subtotal = this.products.reduce((acc, product) => acc + product.total, 0);
          $("#subtotal, #total").text(subtotal.toFixed(2));
        });
      },
      onError: (response, status, error) => {
        console.log(response, status, error);
        if (status !== "success") {
          Swal.fire({
            title: "Not Available!",
            text: "Cart is not yet available for guest. Please login to continue",
            icon: "error",
            confirmButtonText: "Ok"
          }).then(() => {
            window.location.href = "/login";
          });
        }
      }
    });
  }

  onCheckout() {
    let cart = [];
    $(".cart-selected").each((index, item) => {
      const id = item.dataset.id;
      const product = this.products.filter(product => product.id == id)[0];
      cart.push(product.id);
    });

    if (cart.length === 0) {
      // message confirm user no items selected checking out all items
      Swal.fire({
        title: "No items selected!",
        text: "Do you want to checkout all items?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(result => {
        if (result.isConfirmed) {
          window.href = "/checkout";
        }
      });
    }

    // confirm check out count of products
    Swal.fire({
      title: `${cart.length} item(s) selected`,
      text: `Please confirm to checkout ${cart.length} item(s)`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "No"
    }).then(result => {
      if (result.isConfirmed) {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "/checkout";
      }
    });
  }

  bindEvents() {
    $(document).ready(() => {
      $("#cart-upd").hide();
      this.fetchItems();
    });

    $(document).on("click", "#checkout", () => {
      this.onCheckout();
    });

    // UPDATE CART
    $(document).on("click", "#cart-upd", () => {
      this.checkCart();
      const isValid = this.products.every(product => $(`#item_qty_${product.id}`).val() > 0);
      if (!isValid) {
        Swal.fire({
          title: "Invalid Quantity!",
          text: "Please input a valid quantity.",
          icon: "warning",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      this.products.forEach(product => {
        const id = product.id;
        let qty = $(`#item_qty_${id}`).val();
        product.quantity = qty;
        product.total = product.quantity * product.price;
      });

      ajaxRequest.put({
        url: "/api/cart",
        data: { products: this.products },
        onSuccess: res => {
          Swal.fire({
            title: "Cart Updated!",
            text: "Your cart has been updated.",
            icon: "success",
            confirmButtonColor: "#3085d6"
          });

          const subtotal = this.products.reduce((acc, product) => acc + product.total, 0);
          $("#subtotal, #total").text(subtotal.toFixed(2));
          $("#cart-upd").hide();
        },
        onError: res => {
          Swal.fire({
            title: "Oops something went wrong!",
            text: "Please contact us.",
            icon: "error",
            confirmButtonColor: "#3085d6"
          });
        }
      });
    });

    $(document).on("change", ".item_qty", () => $("#cart-upd").show());

    // REMOVE ITEM
    $(document).on("click", ".item-rm-btn", e => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d13",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        const id = e.target.dataset.id;
        const product = this.products.find(product => product.id === id);
        const index = this.products.indexOf(product);
        this.products.splice(index, 1);

        if (result.isConfirmed) {
          this.onDelete(id);
        }
      });
    });
  }

  init() {
    this.bindEvents();
  }
}
