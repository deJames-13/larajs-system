import ajaxRequest from "../assets/ajaxRequest.js";
import OrderItem from "../components/OrderItem.js";
import { ADMIN_STATUS_MESSAGE, CUSTOMER_STATUS_MESSAGE, badgeColors, buttonActions, status, swalAlerts } from "./config.js";

const id = $("#order-id").data("id");
const role = $("#user-role").data("role");
const isAdmin = role === "admin";
var data = {};
const products = [];
const statusMessage = isAdmin ? ADMIN_STATUS_MESSAGE : CUSTOMER_STATUS_MESSAGE;

const setStatusMessage = status => {
  $("#status-badge").text(status);
  Object.values(badgeColors).forEach(color => {
    $("#status-badge").removeClass(color);
  });

  $(".status-badge").addClass(badgeColors[status]);
  $("#status-message").html(statusMessage[status]);
  // delete #cancelling-form if status is not pending or processing
  // || status == 'processing'
  if (!(status == "pending")) {
    $("#cancelling-form").remove();
  }
};

const setActionBtn = status => {
  if (status != "cancelled") {
    $(".action-button").text(buttonActions[status].text);
    $(".action-button").attr("id", buttonActions[status].id);
  } else {
    $(".action-button").remove();
  }
};

const viewReceipt = () => {
  $(".page").printThis();
};

const fetchOrder = id => {
  ajaxRequest.get({
    url: "/api/orders/" + id,
    onSuccess: (response, status, error) => {
      $("_skeleton").removeClass("skeleton");

      data = response.data;
      console.log(data);

      // EXTRACT ITEMS
      data.products.forEach(product => {
        product.quantity = product.order_quantity;
        product.total = product.price * product.quantity;
        products.push(product);
      });

      if (products.length === 0) {
        window.location.href = "/";
      }

      // RENDER ORDER ITEMS
      products.forEach(product => {
        // if no product in cart redirect to shop
        if (products.length === 0) {
          window.location.href = "/";
        }

        const cartItem = new OrderItem(product);
        $("#cart-body").append(cartItem.render());

        const subtotal = products.reduce((acc, product) => acc + product.total, 0);
        $("#subtotal, #total").text(subtotal.toFixed(2));
      });

      // EXTRACT PAYLOAD
      const customer_info = data.customer.info || {
        first_name: "",
        last_name: "",
        zip_code: "",
        phone_number: ""
      };
      formData = {
        first_name: customer_info.first_name,
        last_name: customer_info.last_name,
        zip_code: customer_info.zip_code,
        phone_number: customer_info.phone_number,
        email: data.customer.email
      };

      const [address_1, address_2, country, province, city] = data.shipping_address.split(", ");
      address = {
        address_1,
        address_2,
        country,
        province,
        city
      };

      // RENDER PAYLOAD
      Object.keys(formData).forEach(key => {
        $(`input[name=${key}]`).val(formData[key]);
      });
      Object.keys(address).forEach(key => {
        $(`input[name=${key}]`).val(address[key]);
      });
      // disable form
      $("input").attr("disabled", true);

      setStatusMessage(data.status);
      setActionBtn(data.status);

      !isAdmin && setActionBtn("completed");

      $(".page").show();
    },
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
};

$(document).ready(function () {
  // GET ORDER
  $(".page").hide();
  $("_skeleton").addClass("skeleton");
  fetchOrder(id);
});

$(document).on("click", "#view-receipt", () => {
  // render receipt infos
  $("#rcpt_date_issued").text(data.created_at.split("T")[0]);
  $("#rcpt_order_id").text(data.id);
  $("#rcpt_full_name").text(data.customer.full_name);
  $("#rcpt_address").text(data.shipping_address);

  if (data.payment_method) {
    $("#rcpt_order_method").text(data.payment_method);
  } else {
    $("#rcpt_order_method").text("Cash on Delivery");
  }
  if (data.status == "completed") $("#rcpt_order_paiddate").text(data.updated_at.split("T")[0]);
  else $("#rcpt_order_paiddate").text("N/A");

  viewReceipt();
});

const adminFunction = () => {
  // INFO: CRUD: UPDATE
  const updateStatus = statusString => {
    ajaxRequest.put({
      url: "/api/orders/" + id,
      data: { status: "" + statusString },
      onSuccess: (response, status, error) => {
        setStatusMessage(statusString);
        setActionBtn(statusString);
        swalAlerts[statusString](id);
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
  };

  // INFO: VERIFY PENDDING ORDER
  $(document).on("click", "#btn-verify", function () {
    Swal.fire({
      title: "Verify Order",
      html: '<p>Please make sure that the order is correct before proceeding. <br/> <i class="text-xs">*This will send an email to the customer.</i></p>',
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Verify and Accept",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        updateStatus("processing");
      }
    });
  });

  // INFO: SHIP ORDER
  $(document).on("click", "#btn-ship", function () {
    Swal.fire({
      title: "Ship Order",
      html: '<p>Please make sure that the order is ready before shipping. <br/> <i class="text-xs">*This will send an email to the customer.</i></p>',
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ship Now",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        updateStatus(status.shipping);
      }
    });
  });

  // INFO: COMPLETE/ORDER DELIVERED
  $(document).on("click", "#btn-complete", function () {
    Swal.fire({
      title: "Complete Order",
      html: `
            <p>Please confirm the transaction before completing.</p>
            <p>Once the order is completed, it cannot be undone.</p>
            <i class="text-xs">*This will send an email to the customer.</i>

        `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Done",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        updateStatus(status.completed);
      }
    });
  });

  // INFO: CANCEL ORDER
  $(document).on("click", "#btn-cancel", function () {
    Swal.fire({
      title: "Cancel Order",
      html: `
            <p>Are you sure you want to cancel this order? Note: Please provide a reason for cancelling this order.</p>
            <i class="text-xs">*This will send an email to the customer.</i>
        `,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Done",
      cancelButtonText: "Cancel"
    }).then(result => {
      if (result.isConfirmed) {
        updateStatus(status.cancelled);
      }
    });
  });
};

if (isAdmin) {
  adminFunction();
}
