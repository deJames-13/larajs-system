const actionsBtn = {
  edit: `<button id="btn-edit" class="edit btn btn-sm btn-primary ">Edit</button>`,
  view: `<button id="btn-view" class="view btn btn-sm btn-primary btn-outline">View Details</button>`,
  cancel: `<button id="btn-cancel" class="cancel btn btn-sm bg-base-100 hover:text-black text-red-400 border-red-400 hover:bg-red-400">Cancel Order</button>`,
  rate: `<button id="btn-rate" class="edit btn btn-sm btn-primary ">Rate</button>`,
  again: `<button id="btn-again" class="cancel btn btn-sm btn-primary btn-outline">Buy Again</button>`
};
const statuses = {
  pending: {
    message: "Your order is pending for approval.",
    icon: "<i class='fas fa-user-clock'></i>",
    actions: `
        ${actionsBtn.cancel}
        ${actionsBtn.view}
        `
  },
  processing: {
    message: "The seller is preparing your order.",
    icon: "<i class='fas fa-arrows-rotate'></i>",
    actions: `
        ${actionsBtn.view}
        `
  },
  shipping: {
    message: "Your order is on the way.",
    icon: "<i class='fas fa-truck-fast'></i>",
    actions: `
        ${actionsBtn.view}
        `
  },
  completed: {
    message: "Your order has been delivered.",
    icon: "<i class='fas fa-truck'></i>",
    actions: `
        ${actionsBtn.rate}
        ${actionsBtn.view}
        ${actionsBtn.again}
        `
  },
  cancelled: {
    message: "Your order has been cancelled.",
    icon: "<i class='fas fa-ban'></i>",
    actions: `
        ${actionsBtn.view}
        ${actionsBtn.again}
        `
  }
};
const status = {
  pending: "pending",
  processing: "processing",
  shipping: "shipping",
  completed: "completed",
  cancelled: "cancelled"
};

const swalAlerts = {
  processing: id => {
    return Swal.fire({
      title: `Order No. ${id} Verified`,
      text: "Order has been verified successfully! ",
      icon: "success",
      confirmButtonText: "Ok"
    }).then(() => {
      // window.location.href = '/admin/orders';
    });
  },
  shipping: id => {
    return Swal.fire({
      title: `Order No. ${id} Shipped`,
      text: "Order has been shipped successfully! ",
      icon: "success",
      confirmButtonText: "Ok"
    }).then(() => {
      // window.location.href = '/admin/orders';
    });
  },
  completed: id => {
    return Swal.fire({
      title: `Order No. ${id} Complete`,
      html: `
            <p>Order has been completed successfully!</p>
            <a id="view-receipt" class="link link-hover text-gray-600 font-bold">View Receipt</a>
            `,
      icon: "success",
      confirmButtonText: "Ok"
    }).then(() => {
      // window.location.href = '/admin/orders';
    });
  },
  cancelled: id => {
    return Swal.fire({
      title: `Order No. ${id} Cancelled`,
      html: `
            <p>Order has been cancelled!</p>
            `,
      icon: "info",
      confirmButtonText: "Ok"
    }).then(() => {
      // window.location.href = '/admin/orders';
    });
  }
};

const ADMIN_STATUS_MESSAGE = {
  pending: "This order is pending for verification. Please <strong>verify and accept</strong> the order to proceed.",
  processing: "This order is currently being processed. Please <strong>complete the order</strong> to prepare it for shipping.",
  shipping: "This order has been shipped. Please <strong>update the tracking information</strong> to keep the customer informed.",
  completed: "This order has been successfully completed. No further action is required.",
  cancelled: "This order has been cancelled. No further action is required."
};

const CUSTOMER_STATUS_MESSAGE = {
  pending: "This order is pending for verification. We are confirming the order for you!",
  processing: "This order is currently being processed and will be shipped soon.",
  shipping: "This order has been shipped. Please provide a payment once the order is delivered.",
  completed: "This order has been successfully completed. Thank you for shopping with us!",
  cancelled: "This order has been cancelled. Please contact us for more information"
};

const badgeColors = {
  pending: "bg-yellow-400",
  processing: "bg-blue-400",
  shipping: "bg-blue-400",
  completed: "bg-green-400",
  cancelled: "bg-red-400"
};
const buttonActions = {
  pending: {
    id: "btn-verify",
    text: "Verify and Accept"
  },
  processing: {
    id: "btn-ship",
    text: "Ship Order"
  },
  shipping: {
    id: "btn-complete",
    text: "Complete Order"
  },
  completed: {
    id: "view-receipt",
    text: "View Receipt"
  }
};

const confirmAction = {
  processing: (callback = () => {}) => {
    Swal.fire({
      title: "Verify Order",
      html: '<p>Please make sure that the order is correct before proceeding. <br/> <i class="text-xs">*This will send an email to the customer.</i></p>',
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Verify and Accept",
      cancelButtonText: "Cancel"
    }).then(result => {
      result.isConfirmed && callback();
    });
  },

  shipping: (callback = () => {}) => {
    Swal.fire({
      title: "Ship Order",
      html: '<p>Please make sure that the order is ready before shipping. <br/> <i class="text-xs">*This will send an email to the customer.</i></p>',
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ship Now",
      cancelButtonText: "Cancel"
    }).then(result => {
      result.isConfirmed && callback();
    });
  },
  completed: (callback = () => {}) => {
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
      result.isConfirmed && callback();
    });
  },
  cancelled: (callback = () => {}) => {
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
      result.isConfirmed && callback();
    });
  }
};

export { ADMIN_STATUS_MESSAGE, CUSTOMER_STATUS_MESSAGE, actionsBtn, badgeColors, buttonActions, confirmAction, status, statuses, swalAlerts };
