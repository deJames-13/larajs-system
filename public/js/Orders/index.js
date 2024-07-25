import ajaxRequest from "../assets/ajaxRequest.js";
import Order from "../components/OrderCard.js";
import Pagination from "../components/Paginate.js";
import RatingsForm from "../Ratings/form.js";
import { actionsBtn, statuses, swalAlerts } from "./config.js";

export default class OrderManager {
  constructor() {
    this.url = new URL(window.location.href);
    this.page = 1;
    this.statusStr = "all";
    this.orders = [];
    this.actionsBtn = actionsBtn;
    this.statuses = statuses;
    this.swalAlerts = swalAlerts;

    this.bindEvents();
    this.init();
    return this;
  }

  switchTabs(id) {
    var current = $(".tab-active");
    current.removeClass("tab-active text-primary");
    $("#" + id).addClass("tab-active text-primary");
  }

  getItems(page, statusStr) {
    $("#tab-content").empty();
    $("#paginations").empty();

    let q = "";
    let queries = {
      page: page,
      status: statusStr,
      dashboard: false
    };
    Object.keys(queries).forEach(key => {
      q += `${key}=${queries[key]}&`;
    });

    ajaxRequest.get({
      url: "/api/orders?" + q,
      onSuccess: response => {
        // console.log(response);

        $("#no-orders").removeClass("hidden");
        const orders = response.data;
        if (orders.length > 0) {
          $("#no-orders").addClass("hidden");
        }

        this.orders = [];
        $("#tab-content").empty();
        orders.forEach(order => {
          order.statusMessage = statuses[`${order.status}`].message;
          order.statusIcon = statuses[`${order.status}`].icon;
          order.actions = statuses[`${order.status}`].actions;
          const orderCard = new Order(order);
          this.orders.push(order);
          $("#tab-content").append(orderCard.render());
        });

        $("#search-bar").show();
        if (response.links.next || response.prev || response.meta.current_page > 1) {
          const links = new Pagination(response.links, response.meta.current_page).render("#paginations");
          links.onClick(page => getItems(page, statusStr));
        } else {
          $("#paginations").empty();
          $("#search-bar").hide();
        }
        const urlParams = new URLSearchParams(window.location.search);
        const rating = urlParams.get("rating");
        if (rating) {
          this.rateForm(rating);
        }

        return response;
      }
    });
  }

  setStatus(statusStr) {
    this.statusStr = statusStr;
    this.getItems(1, statusStr);
  }

  goToPage(page, statusStr) {
    this.getItems(page, statusStr);
  }

  updateStatus(statusString, id) {
    ajaxRequest.put({
      url: "/api/orders/" + id,
      data: {
        status: "" + statusString
      },
      onSuccess: (response, status, error) => {
        this.setStatus(statusString);
        swalAlerts[statusString](id);
      }
    });
  }

  viewOrder(id) {
    window.location.href = `/orders/${id}`;
  }

  onCancel(id) {
    Swal.fire({
      title: "Cancel Order",
      html: `
        <p>Are you sure you want to cancel <strong>Order #${id}</strong>?</p>
        <i class="text-xs">*Warning: This action cannot be undone!</i>
            `,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Done",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        // NOTE: UPDATE STATUS For customer?
        this.updateStatus("cancelled", id);
      }
    });
  }

  rateForm(id) {
    const orders = this.orders.filter(order => order.id == id && order.status === "completed");
    if (!orders.length) return;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("rating", id);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, null, newUrl);

    const isRated = orders[0].rating != null;
    new RatingsForm({
      order_id: id,
      type: isRated ? "edit" : "create",
      title: `${isRated ? "Edit" : "Send"} Feedback`,
      order: orders[0],
      onClose: () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete("rating");
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, null, newUrl);
        this.init();
      }
    });
  }

  buyAgain(id) {
    const order = this.orders.find(order => order.id == id);
    if (!order?.products?.length) return;

    const payload = {
      products: order.products.map(product => {
        return {
          product_id: product.id,
          quantity: product.pivot.quantity
        };
      }),
      buy_again: 1
    };

    ajaxRequest.post({
      url: "/api/cart",
      data: payload,
      onSuccess: response => {
        Swal.fire({
          title: "Success",
          text: "The items have been added to cart.",
          icon: "success",
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonText: "View Cart"
        }).then(result => {
          if (result.isConfirmed) {
            window.location.href = "/profile?page=cart";
          }
        });
      }
    });
  }

  onTabClick(id) {
    this.switchTabs(id);
    this.statusStr = id.split("-")[1];
    this.goToPage(1, this.statusStr);
  }

  bindEvents() {
    const events = [
      { selector: ".tab", callback: this.onTabClick.bind(this) },
      { selector: "#btn-view", callback: this.viewOrder.bind(this) },
      // { selector: ".order-card", callback: this.viewOrder.bind(this) },
      { selector: "#btn-cancel", callback: this.onCancel.bind(this) },
      { selector: "#btn-rate", callback: this.rateForm.bind(this) },
      { selector: "#btn-again", callback: this.buyAgain.bind(this) }
    ];

    events.forEach(event => {
      $(document).on("click", event.selector, e => {
        const id = event.selector === ".tab" ? e.currentTarget.id : $(e.currentTarget).parent().data("id");
        event.callback(id);
      });
    });
  }

  init() {
    this.goToPage(1, this.statusStr);
  }
}
