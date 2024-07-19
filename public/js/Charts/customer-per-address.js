import ajaxRequest from "../assets/ajaxRequest.js";

export default class CustomerPerAddress {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
    this.fetchCustomerData();
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

  createCustomerChart(customerData) {
    const data = customerData || [];

    const ctx = $(this.target).find("#customer-per-address")[0].getContext("2d");

    this.chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(row => row.address),
        datasets: [
          {
            label: "Customers Per Address",
            data: data.map(row => row.total),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)"
              // Add more colors if needed
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)"
              // Add more colors if needed
            ],
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
$(document).ready(function () {
  const customerPerAddress = new CustomerPerAddress({ target: "#dashboard-content" });
});
