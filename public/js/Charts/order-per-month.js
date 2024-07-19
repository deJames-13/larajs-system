import ajaxRequest from "../assets/ajaxRequest.js";

export default class OrderPerMonth {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
    this.fetchData();
  }

  fetchData() {
    ajaxRequest.get({
      url: "/api/charts/order-per-month",
      onSuccess: response => {
        console.log(response);
        this.createChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  createChart(chartData) {
    const data = chartData || [];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const ctx = $(this.target).find("#order-per-month")[0].getContext("2d");

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(row => monthNames[row.month - 1]),
        datasets: [
          {
            label: "Order Per Month",
            data: data.map(row => row.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      }
    });
  }

  render() {
    // Render the chart when called
    this.fetchData();
  }
}

// Initialize the chart when the document is ready
$(document).ready(function () {
  const orderPerMonth = new OrderPerMonth({ target: "#dashboard-content" });
});
