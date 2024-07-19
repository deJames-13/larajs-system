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
    var ctx = $("#products-sold");
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }
    const data = productsSoldData || [];
    const backgroundColors = data.map((_, i) => `hsla(${(i * 360) / data.length}, 100%, 70%, 0.2)`);
    const borderColors = data.map((_, i) => `hsla(${(i * 360) / data.length}, 100%, 50%, 1)`);
    const chartData = {
      labels: data.map(row => row.name),
      datasets: [
        {
          label: "Products Sold",
          data: data.map(row => row.total_sold),
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }
      ]
    };

    const config = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          }
        }
      }
    };

    this.chart && this.chart.destroy();
    this.chart = new Chart(ctx, config);
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
