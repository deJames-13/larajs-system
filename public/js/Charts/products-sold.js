import ajaxRequest from "../assets/ajaxRequest.js";

const fetchProductsSoldData = () => {
  ajaxRequest.get({
    url: "/api/charts/products-sold",
    onSuccess: response => {
      console.log(response);
      createProductsSoldChart(response);
    },
    onError: error => {
      console.error(error);
    }
  });
};

const createProductsSoldChart = productsSoldData => {
  (async function () {
    const data = productsSoldData || [
      // Sample data structure, adjust based on your API response
      { name: "Product 1", total_sold: 50 },
      { name: "Product 2", total_sold: 30 },
      { name: "Product 3", total_sold: 25 }
      // Add more data as needed
    ];

    const ctx = $("#products-sold");

    new Chart(ctx, {
      type: "doughnut", // Adjust chart type as per your preference
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: "Products Sold",
            data: data.map(row => row.total_sold),
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
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })();
};

$(document).ready(function () {
  fetchProductsSoldData();
});
