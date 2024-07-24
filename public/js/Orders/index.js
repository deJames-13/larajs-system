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

    let queries = ["page=" + page, "status=" + statusStr];
    let q = queries.join("&");

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

  // INFO: CRUD: UPDATE
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

  bindEvents() {
    $(".tab").click(e => {
      const id = e.currentTarget.id;
      // console.log(id);
      this.switchTabs(id);
      this.statusStr = id.split("-")[1];
      this.getItems(1, this.statusStr);
    });
    $(document)
      .on("click", "#btn-view", e => {
        const id = $(e.currentTarget).parent().data("id");
        this.viewOrder(id);
      })
      .on("click", ".order-card", e => {
        const id = $(e.currentTarget).data("id");
        // this.viewOrder(id);
      })
      .on("click", "#btn-cancel", e => {
        const id = $(e.currentTarget).parent().data("id");
        this.onCancel(id);
      })
      .on("click", "#btn-rate", e => {
        const id = $(e.currentTarget).parent().data("id");
        this.rateForm(id);
      });
  }

  init() {
    this.goToPage(1, this.statusStr);
  }
}
