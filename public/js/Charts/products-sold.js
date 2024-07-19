import ajaxRequest from "../assets/ajaxRequest.js";

export default class ProductsSold {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
    this.fetchProductsSoldData();
  }

  fetchProductsSoldData() {
    ajaxRequest.get({
      url: "/api/charts/products-sold",
      onSuccess: response => {
        console.log("Fetched Products Sold Data:", response);
        this.createProductsSoldChart(response);
      },
      onError: error => {
        console.error("Error fetching products sold data:", error);
      }
    });
  }

  createProductsSoldChart(productsSoldData) {
    const data = productsSoldData || [];

    const ctx = $(this.target).find("#products-sold")[0];
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }

    console.log("Creating chart with data:", data);

    this.chart = new Chart(ctx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: "Products Sold",
            data: data.map(row => row.count),
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
    this.fetchProductsSoldData();
  }
}

// Initialize the chart when the document is ready
$(document).ready(function () {
  const productsSold = new ProductsSold({ target: "#dashboard-content" });
});
