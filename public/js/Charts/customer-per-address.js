import ajaxRequest from "../assets/ajaxRequest.js";

export default class CustomerPerAddress {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
  }

  fetchCustomerData() {
    ajaxRequest.get({
      url: "/api/charts/customer-per-address",
      onSuccess: response => {
        console.log(response);
        this.createCustomerChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  async createCustomerChart(customerData) {
    const data = customerData || [];

    var ctx = $(this.target).find("#customer-per-address")[0];
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }
    ctx = ctx.getContext("2d");

    const backgroundColors = data.map((_, i) => `rgba(${255 - i * 50}, ${99 + i * 50}, 132, 0.2)`);
    const borderColors = data.map((_, i) => `rgba(${255 - i * 50}, ${99 + i * 50}, 132, 1)`);

    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(row => row.address),
        datasets: [
          {
            label: "Customers Per Address",
            data: data.map(row => row.total),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      }
    });
  }

  render() {
    // Render the chart when called
    this.fetchCustomerData();
  }
}

// Initialize the chart when the document is ready
// $(document).ready(function () {
//   const customerPerAddress = new CustomerPerAddress({ target: "#dashboard-content" });
// });
