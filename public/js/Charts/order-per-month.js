// import Chart from 'chart.js/auto';
import ajaxRequest from '../assets/ajaxRequest.js';

// TODO: this is basic chart, 
//          add more date in one chart and make it dynamic
//          charts should be in one page
//          charts should be tabbed: Order Per Month | chart 2 | chart 3
//          Or charts should be carouseld: Order Per Month > chart 2 > chart 3



const fetchData = () => {
    ajaxRequest.get({
        url: '/api/charts/order-per-month',
        onSuccess: (response) => {
            console.log(response);
        },
        onError: (error) => {
            console.error(error);
        }

    })

};

const createChart = (chartData) => {
    (async function () {
        const data = chartData || [
            // format ng data, ganto dapat labas sa api/ChartController
            { month: 1, count: 10 },
            { month: 2, count: 20 },
            { month: 3, count: 15 },
            { month: 4, count: 25 },
            { month: 5, count: 22 },
            { month: 6, count: 30 },
            { month: 7, count: 28 },
            { month: 8, count: 28 },
            { month: 9, count: 28 },
            { month: 10, count: 28 },
        ];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const ctx = $('#order-per-month');

        new Chart(
            ctx,
            {
                type: 'bar',
                data: {
                    labels: data.map(row => monthNames[row.month - 1]),
                    datasets: [
                        {
                            label: 'Order Per Month',
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    })();
}

$(document).ready(function () {
    const data = fetchData();
    createChart(data);

});