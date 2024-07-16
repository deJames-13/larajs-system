import ajaxRequest from "../assets/ajaxRequest.js";

const fetchCustomerData = () => {
  ajaxRequest.get({
    url: "/api/charts/customer-per-address",
    onSuccess: response => {
      console.log(response);
      createCustomerChart(response);
    },
    onError: error => {
      console.error(error);
    }
  });
};

const createCustomerChart = customerData => {
  (async function () {
    const data = customerData || [
      // Sample data structure, adjust based on your API response
      { address: "Address 1", total: 10 },
      { address: "Address 2", total: 20 },
      { address: "Address 3", total: 15 }
      // Add more data as needed
    ];

    const ctx = $("#customer-per-address");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map(row => row.address),
        datasets: [
          {
            label: "Customers Per Address",
            data: data.map(row => row.total)
          }
        ]
      }
    });
  })();
};

$(document).ready(function () {
  fetchCustomerData();
});
