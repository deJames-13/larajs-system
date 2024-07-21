import ajaxRequest from "../assets/ajaxRequest.js";

export default class LowStock {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
  }

  fetchLowStockData() {
    ajaxRequest.get({
      url: "/api/charts/low-stock", // Update with the correct route if necessary
      onSuccess: response => {
        this.createLowStockChart(response);
      },
      onError: error => {
        console.error(error);
      }
    });
  }

  async createLowStockChart(lowStockData) {
    const data = lowStockData || [];
    var isNoData = data.length === 0;

    const ctx = $(this.target);

    this.chart && this.chart.destroy();
    this.chart = new Chart(ctx, {
      type: "doughnut",
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
        plugins: {
          title: {
            display: isNoData,
            text: "Nothing to show.",
            align: "center"
          },
          legend: {
            display: false
          }
        }
      }
    });
  }

  render() {
    this.fetchLowStockData();
  }
}
