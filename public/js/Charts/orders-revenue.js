import ajaxRequest from '../assets/ajaxRequest.js';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fetchRevenueData = () => {
    ajaxRequest.get({
        url: '/api/charts/orders-revenue',
        onSuccess: (response) => {
            console.log(response);
            createRevenueChart(response);
        },
        onError: (error) => {
            console.error(error);
        }
    });
};

const createRevenueChart = (revenueData) => {
    (async function () {
        const data = revenueData || [];

        const ctx = document.getElementById('orders-revenue').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => monthNames[row.month - 1]), // Convert month number to month name
                datasets: [
                    {
                        label: 'Revenue',
                        data: data.map(row => row.revenue),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (context) => {
                                return `Revenue: ${context.raw}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
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
                            text: 'Revenue',
                            font: {
                                size: 18
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month',
                            font: {
                                size: 18
                            }
                        }
                    }
                }
            }
        });
    })();
};

document.addEventListener('DOMContentLoaded', function () {
    fetchRevenueData();
});
