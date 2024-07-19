import ajaxRequest from "../assets/ajaxRequest.js";

export default class ProductsSold {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
  }

  fetchProductsSoldData() {
    ajaxRequest.get({
      url: "/api/charts/products-sold",
      onSuccess: response => {
        this.createProductsSoldChart(response);
      },
      onError: error => {
        console.error("Error fetching products sold data:", error);
      }
    });
  }

  async createProductsSoldChart(productsSoldData) {
    const data = productsSoldData || [];

    var ctx = $(this.target).find("#products-sold")[0];
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }
    // ctx = ctx.getContext("2d");
    console.log("Creating chart with data:", data);
    console.log("ctx", ctx);

    const backgroundColors = data.map((_, i) => `rgba(${255 - i * 50}, ${99 + i * 50}, 132, 0.2)`);
    const borderColors = data.map((_, i) => `rgba(${255 - i * 50}, ${99 + i * 50}, 132, 1)`);
    this.chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: "Products Sold",
            data: data.map(row => row.count),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1
          }
        ]
      }
    });
    console.log("ctx", this.chart);
  }

  render() {
    // Render the chart when called
    this.fetchProductsSoldData();
  }
}

// Initialize the chart when the document is ready
// $(document).ready(function () {
//   const productsSold = new ProductsSold({ target: "#dashboard-content" });
// });
