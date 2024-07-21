import ajaxRequest from "../assets/ajaxRequest.js";
import OrderItem from "../components/OrderItem.js";
import { ADMIN_STATUS_MESSAGE, CUSTOMER_STATUS_MESSAGE, badgeColors, buttonActions, confirmAction, status, swalAlerts } from "./config.js";

export default class OrderShow {
  constructor() {
    this.id = $("#order-id").data("id");
    this.role = $("#user-role").data("role");
    this.isAdmin = this.role !== "customer";
    this.data = {};
    this.products = [];
    this.status = status;
    this.swalAlerts = swalAlerts;
    this.statusMessage = this.isAdmin ? ADMIN_STATUS_MESSAGE : CUSTOMER_STATUS_MESSAGE;
    this.badgeColors = badgeColors;
    this.buttonActions = buttonActions;
    this.confirmAction = confirmAction;

    this.formData = formData;
    this.address = address;

    this.bindEvents();
    this.init();
  }

  setStatusMessage(status) {
    $("#status-badge").text(status);
    Object.values(this.badgeColors).forEach(color => {
      $("#status-badge").removeClass(color);
    });

    $(".status-badge").addClass(this.badgeColors[status]);
    $("#status-message").html(this.statusMessage[status]);

    // delete #cancelling-form if status is not pending or processing
    // || status == 'processing'
    if (!(status == "pending")) {
      $("#cancelling-form").remove();
    }

    // if status is completed
  }

  setActionBtn(status) {
    if (status != "cancelled") {
      $(".action-button").text(this.buttonActions[status].text);
      $(".action-button").attr("id", this.buttonActions[status].id);
    } else {
      $(".action-button").remove();
    }
  }

  viewReceipt() {
    $(".page").printThis();
  }

  populateForm(response) {
    // console.log(response);
    this.data = response.data;

    $("_skeleton").removeClass("skeleton");
    this.products = [];
    this.data.products.forEach(product => {
      product.quantity = product.order_quantity;
      product.total = product.price * product.quantity;
      this.products.push(product);
    });

    if (this.products.length === 0) {
      // window.location.href = "/";
    }

    // RENDER ORDER ITEMS
    $("#cart-body").empty();
    this.products.forEach(product => {
      // if no product in cart redirect to shop
      if (this.products.length === 0) {
        // window.location.href = "/";
      }

      const cartItem = new OrderItem(product);
      $("#cart-body").append(cartItem.render());

      const subtotal = this.products.reduce((acc, product) => acc + product.total, 0);
      $("#subtotal, #total").text(subtotal.toFixed(2));
    });

    // EXTRACT PAYLOAD

    const customer_info = this.data.customer.info || {
      first_name: "",
      last_name: "",
      zip_code: "",
      phone_number: ""
    };
    this.formData = {
      first_name: customer_info.first_name,
      last_name: customer_info.last_name,
      zip_code: customer_info.zip_code,
      phone_number: customer_info.phone_number,
      email: this.data.customer.email
    };

    const [address_1, address_2, country, province, city] = this.data.shipping_address.split(", ");

    this.address = {
      address_1,
      address_2,
      country,
      province,
      city
    };

    // RENDER PAYLOAD
    Object.keys(this.formData).forEach(key => {
      $(`input[name=${key}]`).val(this.formData[key]);
    });
    Object.keys(this.address).forEach(key => {
      $(`input[name=${key}]`).val(this.address[key]);
    });
    // disable form
    $("input").attr("disabled", true);

    this.setStatusMessage(this.data.status);
    this.setActionBtn(this.data.status);

    !this.isAdmin && this.setActionBtn("completed");

    $("#rcpt_order_paiddate").text(this.data.paid_date);

    $(".page").show();
  }

  fetchOrder(id) {
    ajaxRequest.get({
      url: "/api/orders/" + this.id,
      onSuccess: response => this.populateForm(response),
      onError: (response, status, error) => {
        if (status !== "success") {
          console.log(error);
          Swal.fire({
            title: error,
            text: "Something went wrong!",
            icon: "error",
            confirmButtonText: "Ok"
          }).then(() => {
            // window.location.replace('/orders');
          });
          return;
        }
      }
    });
  }

  updateStatus(statusString) {
    ajaxRequest.put({
      url: "/api/orders/" + this.id,
      data: { status: "" + statusString },
      onSuccess: (response, status, error) => {
        this.populateForm(response);
        this.setStatusMessage(statusString);
        this.setActionBtn(statusString);
        this.swalAlerts[statusString](this.id);
      },
      onError: (response, status, error) => {
        if (status !== "success") {
          Swal.fire({
            title: error,
            text: "Something went wrong!",
            icon: "error",
            confirmButtonText: "Ok"
          });
          return;
        }
      }
    });
  }

  bindEvents() {
    $(document).on("click", "#view-receipt", () => {
      // render receipt infos
      $("#rcpt_date_issued").text(this.data.created_at.split("T")[0]);
      $("#rcpt_order_id").text(this.data.id);
      $("#rcpt_full_name").text(this.data.customer.full_name);
      $("#rcpt_address").text(this.data.shipping_address);
      ``;
      if (this.data.payment_method) $("#rcpt_order_method").text(this.data.payment_method);
      else $("#rcpt_order_method").text("Cash on Delivery");

      if (this.data.status == "completed") $("#rcpt_order_paiddate").text(this.data.updated_at.split("T")[0]);
      else $("#rcpt_order_paiddate").text("N/A");

      this.viewReceipt();
    });

    this.bindActions();
  }

  bindActions() {
    const adminBinds = {
      "#btn-verify": "processing",
      "#btn-ship": "shipping",
      "#btn-complete": "completed"
    };
    var buttonStatusMap = {
      "#btn-cancel": "cancelled"
    };

    buttonStatusMap = this.isAdmin ? { ...buttonStatusMap, ...adminBinds } : buttonStatusMap;
    Object.keys(buttonStatusMap).forEach(button => {
      $(document).on("click", button, () => {
        const statusKey = buttonStatusMap[button];
        if (!this.confirmAction[statusKey]) return;

        this.confirmAction[statusKey](() => {
          this.updateStatus(statusKey);
        });
      });
    });
  }
  init() {
    // GET ORDER
    $(".page").hide();
    $("_skeleton").addClass("skeleton");
    this.fetchOrder(this.id);
  }
}
