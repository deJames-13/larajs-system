import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

export default class OrdersPage {
    constructor({ target }) {
        this.badgeColors = {
            'pending': 'bg-yellow-400',
            'processing': 'bg-blue-400',
            'shipping': 'bg-blue-400',
            'completed': 'bg-green-400',
            'cancelled': 'bg-red-400'
        };
        this.render(target);
        this.dataTable = new DataTable({
            parent: '#table-wrapper',
            tableId: 'ordersTable',
            tableName: 'orders',
            tableTitle: 'Order DataTable',
            limit: 10,
            minLimit: 1,
            maxLimit: 100,
            fileButtons: ['pdf', 'excel', 'print', 'csv'],
            makeTable: this.makeTable.bind(this),
        });
        this.bindEvents();

    }
    static init({ target }) {
        const instance = new OrdersPage({ target });
        return instance;
    }

    makeTable(data) {
        return data.map(order => {
            let total = 0;
            const products = order.products;
            products.map(product => {
                total += product.price * product.order_quantity;
            });

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
                "Total": `<strong>P ${total.toFixed(2)}</strong>`,
                "Status": `
                <div class="badge ${this.badgeColors[order.status]} gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class=" print:hidden inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    ${order.status}
                </div>
                `,
                "": `
                <div class="print:hidden flex items-center justify-end w-full gap-3">
                <a href="/orders/${order.id}/" class="btn btn-xs btn-secondary">Manage</a>
                <form id="row_delete__${order.id}" data-id="${order.id}" method="POST">
                    <button type="submit" data-id="${order.id}" class="row-delete btn btn-xs bg-red-400">Trash</button>
                </form>
            </div>
                `,
            };
        });
    }
    bindEvents() {


        $('#import-form').on('submit', (e) => {
            e.preventDefault();
            this.importExcel();
        });
    }
    importExcel() {
        const formData = new FormData($('#import-form')[0]);
        ajaxRequest.post({
            url: '/admin/orders',
            data: formData,
            onSuccess: (response) => {
                Swal.fire(
                    'Success!',
                    'Brands imported successfully',
                    'success'
                )
                this.dataTable.updateTable();
            },
            onError: (response) => {
                Swal.fire(
                    'Oops!',
                    'Something went wrong...',
                    'error'
                )
            },
        });

    }

    render(target) {
        $(target).html('');
        const page = `
            <div id="orders-wrapper" class="flex flex-col space-y-4 items-center justify-center pb-12">
                <div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">

                </div>
                <div class="container flex flex-col-reverse gap-2 lg:flex-row justify-between items-center>
                    <form id="import-form" method="POST" enctype="multipart/form-data" action="/admin/orders"
                        class="flex flex-col-reverse lg:flex-row gap-2 items-center">
                        <!-- {{ csrf_field() }} -->
                        <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
                        <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
                    </form>
                    
                </div>
		</div>
        `
        $(target).html(page);

    }

}