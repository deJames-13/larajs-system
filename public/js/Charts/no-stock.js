import ajaxRequest from "../assets/ajaxRequest.js";

export default class NoStock {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
    this.fetchNoStockData();
  }

  fetchNoStockData() {
    ajaxRequest.get({
      url: "/api/charts/no-stock",  // Update with the correct route if necessary
      onSuccess: response => {
        console.log(response);
        this.createNoStockChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  createNoStockChart(NoStockData) {
    const data = NoStockData || [];

    const ctx = $(this.target).find("#no-stock")[0].getContext("2d");

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
    this.fetchNoStockData();
  }
}

// Initialize the chart when the document is ready
$(document).ready(function () {
  const NoStock = new NoStock({ target: "#chart-container" });  // Fixed class name
});
