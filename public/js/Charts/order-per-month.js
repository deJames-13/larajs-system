import ajaxRequest from "../assets/ajaxRequest.js";

export default class OrderPerMonth {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
  }

  fetchData() {
    ajaxRequest.get({
      url: "/api/charts/order-per-month",
      onSuccess: response => {
        this.createChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  async createChart(chartData) {
    const data = chartData || [];

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const ctx = $(this.target);
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }

    this.chart && this.chart.destroy();
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map(row => monthNames[row.month - 1]),
        datasets: [
          {
            label: "Order Per Month",
            data: data.map(row => row.total),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      }
    });
  }

  render() {
    this.fetchData();
  }
}

// Initialize the chart when the document is ready
// $(document).ready(function () {
//   const orderPerMonth = new OrderPerMonth({ target: "#dashboard-content" });
// });
