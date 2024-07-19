import ajaxRequest from "../assets/ajaxRequest.js";

export default class OrdersRevenue {
  constructor({ target }) {
    this.target = target;
    this.chart = null;
  }

  fetchRevenueData() {
    ajaxRequest.get({
      url: "/api/charts/orders-revenue",
      onSuccess: response => {
        this.createRevenueChart(response);
      },
      onError: error => {
        console.error("Error fetching orders revenue data:", error);
      }
    });
  }

  async createRevenueChart(revenueData) {
    const data = revenueData || [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Create a revenue map with default values
    const revenueMap = monthNames.reduce((map, month, index) => {
      map[month] = 0; // Default revenue is 0 for each month
      return map;
    }, {});

    // Populate the revenue map with actual data
    data.forEach(row => {
      const monthName = monthNames[row.month - 1]; // Assuming 'row.month' is 1-12
      revenueMap[monthName] = row.revenue;
    });

    var ctx = $(this.target).find("#orders-revenue")[0];
    if (!ctx) {
      console.error("Canvas element for products sold chart not found.");
      return;
    }
    // ctx = ctx.getContext("2d");

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthNames,
        datasets: [
          {
            label: "Revenue",
            data: monthNames.map(month => revenueMap[month]),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: context => {
                return `Revenue: ${context.raw}`;
              }
            }
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 16
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Revenue",
              font: {
                size: 18
              }
            }
          },
          x: {
            title: {
              display: true,
              text: "Month",
              font: {
                size: 18
              }
            }
          }
        }
      }
    });
  }

  render() {
    this.fetchRevenueData();
  }
}

// Initialize the chart when the document is ready
// $(document).ready(function () {
//   const ordersRevenue = new OrdersRevenue({ target: "#dashboard-content" });
// });
