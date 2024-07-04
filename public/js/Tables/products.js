import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

export default class ProductsPage {
    constructor({ target }) {

        this.render(target);
        this.dataTable = new DataTable({
            parent: '#table-wrapper',
            tableId: 'productsTable',
            tableName: 'products',
            tableTitle: 'Product DataTable',
            limit: 10,
            minLimit: 1,
            maxLimit: 100,
            fileButtons: ['pdf', 'excel', 'print', 'csv'],
            makeTable: this.makeTable,
        });

        this.bindEvents();
    }
    static init({ target }) {
        const instance = new ProductsPage({ target });
        return instance;
    }

    makeTable(data) {
        return data.map(product => ({
            "ID": `${product.id}`,
            "Name": `${product.name}`,
            "SKU": `${product.sku_code}`,
            "Price": `${product.price}`,
            "Stock": `${product.stock}`,
            "": `
            <div class="print:hidden w-full flex items-center justify-end gap-3">
                <a href="/products/${product.id}" class="btn btn-xs btn-primary">View</a>
                <a href="/admin/products/edit/${product.id}/" class="btn btn-xs btn-secondary">Edit</a>
                <button id="row-delete__${product.id}" data-id="${product.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </div>
            `,
        }));
    }

    onDelete(id) {
        ajaxRequest.delete({
            url: '/api/products/' + id,
            onSuccess: (response) => {
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
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

    bindEvents() {
        $(document).on('click', '.row-delete', (e) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const id = $(e.target).data('id');
                    this.onDelete(id);
                }
            });
        });

        $('#import-form').on('submit', (e) => {
            e.preventDefault();
            this.importExcel();
        });
    }

    importExcel() {
        const formData = new FormData($('#import-form')[0]);
        ajaxRequest.post({
            url: '/admin/products',
            data: formData,
            onSuccess: (response) => {
                Swal.fire(
                    'Success!',
                    'Products imported successfully',
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
            <div id="products-wrapper" class="flex flex-col space-y-4 items-center justify-center pb-12">
            
			<div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">

			</div>
            <div class="container flex flex-col-reverse gap-2 lg:flex-row justify-between items-center">
                <form id='import-form' method='POST' enctype='multipart/form-data' action='/admin/products'
                    class="flex flex-col-reverse lg:flex-row gap-2 items-center">
                    <!-- {{ csrf_field() }} -->
                    <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
                    <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
                </form>
                <div class="container flex space-x-2 justify-end align-items-center">
                    <button class="btn btn-sm text-white btn-success inline-block self-end">
                        <a href="/admin/products/create">Add Product</a>
                    </button>
                    <button class="btn btn-sm text-white bg-primary inline-block self-end">
                        <a href="/admin/products/create">Restore</a>
                    </button>
                </div>
            </div>
		</div>
        `
        $(target).html(page);

    }

}