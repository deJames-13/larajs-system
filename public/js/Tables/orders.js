import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

var dataTable;

const badgeColors = {
    'pending': 'bg-yellow-400',
    'processing': 'bg-blue-400',
    'shipping': 'bg-blue-400',
    'completed': 'bg-green-400',
    'cancelled': 'bg-red-400'
}

const makeTable = (data) => {
    // console.log(data);
    return data.map(order => {
        let total = 0;
        const products = order.products;
        products.map(product => {
            total += product.price * product.order_quantity;
        });
        // console.log(products);

        const customer = order.customer || {
            fullname: '',
            email: '',
            phone_number: ''
        }
        return {
            "ID": `${order.id}`,
            "Customer Info": `
            <div class="flex items-center gap-3">
                <div class="print:hidden avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">
                        ${customer.fullname}
                    </div>
                    <div class="text-md opacity-50">
                        @${customer.username}
                    </div>
                    <div class="text-sm opacity-50">
                        ${customer.email}
                    </div>
                </div>
            </div>
            `,
            "Shipping Address": `${order.shipping_address}`,
            "Contact": `${customer.info && customer.info.phone_number}`,
            "Status": `
            <div class="badge ${badgeColors[order.status]} gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class=" print:hidden inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ${order.status}
            </div>
            
            `,
            "Total": `P ${total.toFixed(2)}`,
            "": `
            <div class="print:hidden flex items-center flex-end w-full gap-3">
            <a href="/orders/${order.id}/" class="btn btn-xs btn-secondary">Manage</a>
            <form id="row_delete__${order.id}" data-id="${order.id}" method="POST">
                <button type="submit" data-id="${order.id}" class="row-delete btn btn-xs bg-red-400">Trash</button>
            </form>
        </div>
            `,


        };
    });
}

$(document).ready(function () {
    dataTable = new DataTable({
        parent: '#table-wrapper',
        tableId: 'ordersTable',
        tableName: 'orders',
        tableTitle: 'Order DataTable',
        limit: 10,
        minLimit: 1,
        maxLimit: 100,
        fileButtons: ['pdf', 'excel', 'print', 'csv'],
        makeTable: makeTable,
    });
});
