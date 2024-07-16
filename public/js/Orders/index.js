import ajaxRequest from "../assets/ajaxRequest.js";
import Order from "../components/OrderCard.js";
import Pagination from "../components/Paginate.js";
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
        return response;
      },
      onError: error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }
    });
  }

  setStatus(statusStr) {
    this.statusStr = statusStr;
    this.getItems(1, statusStr);
  }

  goToPage(page, statusStr) {
    const res = this.getItems(page, statusStr);
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
      },
      onError: error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }
    });
  }
  viewOrder(id) {
    window.location.href = `/orders/${id}`;
  }
  bindEvents() {
    $(document).on("click", "#btn-view", e => {
      const id = $(e.currentTarget).parent().data("id");
      this.viewOrder(id);
    });

    $(".tab").click(e => {
      const id = e.currentTarget.id;
      // console.log(id);
      this.switchTabs(id);
      this.statusStr = id.split("-")[1];
      const res = this.getItems(1, this.statusStr);
    });

    // INFO: VIEW ORDER
    $(document).on("click", ".order-card", e => {
      const id = $(e.currentTarget).data("id");
      // this.viewOrder(id);
    });
    // INFO: CANCEL ORDER
    $(document).on("click", "#btn-cancel", e => {
      const id = $(e.currentTarget).parent().data("id");
      // console.log(id);

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
    });
  }

  init() {
    this.goToPage(1, this.statusStr);
  }
}
