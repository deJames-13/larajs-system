import ajaxRequest from "../assets/ajaxRequest.js";
import { debounce } from "../assets/debounce.js";
import Order from "../components/OrderCard.js";
import Pagination from "../components/Paginate.js";
import RatingsForm from "../Ratings/form.js";
import { actionsBtn, statuses, swalAlerts } from "./config.js";

export default class OrderManager {
  constructor() {
    this.url = new URL(window.location.href);
    this.orders = [];
    this.actionsBtn = actionsBtn;
    this.statuses = statuses;
    this.swalAlerts = swalAlerts;
    const get = this.getUrlParams();
    this.queries = {
      page: 1,
      maxPage: 1,
      status: "all",
      dashboard: false,
      search: "",
      ...get
    };

    this.bindEvents();
    this.init();
    return this;
  }

  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let queries = {};
    for (let [key, value] of urlParams) {
      queries[key] = value;
    }
    return queries;
  }

  pushUrlParams({ key, value }) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.pushState({}, "", "?" + urlParams.toString());
  }

  switchTabs(status) {
    var current = $(".tab-active");
    current.removeClass("tab-active text-primary");
    $("#order-" + status).addClass("tab-active text-primary");
  }

  getItems() {
    $("#tab-content").empty();
    $("#paginations").empty();

    let q = "";
    Object.keys(this.queries).forEach(key => {
      q += `${key}=${this.queries[key]}&`;
    });
    this.pushUrlParams({ key: "status", value: this.queries.status });
    this.pushUrlParams({ key: "page", value: this.queries.page });

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
          links.onClick(page => this.goToPage(page));
          this.queries.maxPage = response.meta.last_page;
          if (this.queries.page < 1 || this.queries.page > this.queries.maxPage) return this.goToPage(1);
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
    this.switchTabs(statusStr);
    this.queries.status = statusStr;
    this.goToPage(this.queries.page);
  }

  goToPage(page) {
    this.queries.page = page;
    this.getItems();
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

  onTabClick(e) {
    const id = e.currentTarget.id;
    this.setStatus(id.split("-")[1]);
  }

  viewOrder(e) {
    const id = $(e.currentTarget).parent().data("id");
    window.location.href = `/orders/${id}`;
  }

  onCancel(e) {
    const id = $(e.currentTarget).parent().data("id");
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

  rateForm(e) {
    const id = $(e.currentTarget).parent().data("id");
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

  buyAgain(e) {
    const id = $(e.currentTarget).parent().data("id");
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
            window.location.href = "/profile?nav=cart";
          }
        });
      }
    });
  }

  onSearch(string) {
    this.queries.search = string;
    this.goToPage(1);
  }

  bindEvents() {
    const doSearch = debounce(e => {
      this.onSearch(e.target.value);
    }, 500);

    const events = [
      { action: "click", selector: ".tab", callback: this.onTabClick.bind(this) },
      { action: "click", selector: "#btn-view", callback: this.viewOrder.bind(this) },
      // { action:"click", selector: ".order-card", callback: this.viewOrder.bind(this) },
      { action: "click", selector: "#btn-cancel", callback: this.onCancel.bind(this) },
      { action: "click", selector: "#btn-rate", callback: this.rateForm.bind(this) },
      { action: "click", selector: "#btn-again", callback: this.buyAgain.bind(this) },
      { action: "input", selector: "#order-search-bar input", callback: doSearch }
    ];

    events.forEach(event => {
      $(document).on(event.action, event.selector, e => {
        event.callback(e);
      });
    });
  }

  init() {
    this.setStatus(this.queries.status);
  }
}
