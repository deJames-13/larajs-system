import ajaxRequest from "../assets/ajaxRequest.js";

export default class LowStock {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
    this.fetchLowStockData();
  }

  fetchLowStockData() {
    ajaxRequest.get({
      url: "/api/charts/low-stock",  // Update with the correct route if necessary
      onSuccess: response => {
        console.log(response);
        this.createLowStockChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  createLowStockChart(lowStockData) {
    const data = lowStockData || [];

    const ctx = $(this.target).find("#low-stock")[0].getContext("2d");

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map(item => item.name),
        datasets: [
          {
            label: "Quantity",
            data: data.map(item => item.quantity),
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
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  render() {
    // Render the chart when called
    this.fetchLowStockData();
  }
}

// Initialize the chart when the document is ready
$(document).ready(function () {
  const lowStock = new LowStock({ target: "#chart-container" });  // Fixed class name
});
