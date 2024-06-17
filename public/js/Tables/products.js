import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

var dataTable
const makeTable = (data) => {
    // console.log(data);
    return data.map(product => {
        return {
            "ID": `${product.id}`,
            "Name": `${product.name}`,
            "SKU": `${product.sku_code}`,
            "Price": `${product.price}`,
            "Stock": `${product.stock}`,
            "": `
            <div class="print:hidden flex items-center flex-end w-full gap-3">
            <a href="/products/${product.id}" class="btn btn-xs btn-primary">View</a>
            <a href="/admin/products/edit/${product.id}/" class="btn btn-xs btn-secondary">Edit</a>
            <form id="row_delete__${product.id}" data-id="${product.id}" method="POST">
                <button type="submit" data-id="${product.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </form>
        </div>
            `,


        };
    });
}


const onDelete = (id) => {
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.delete({
        url: '/api/products/' + id,
        token: token,
        onSuccess: (response) => {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            dataTable.updateTable();
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
$(document).ready(function () {
    dataTable = new DataTable({
        parent: '#table-wrapper',
        tableId: 'productsTable',
        tableName: 'products',
        tableTitle: 'Product DataTable',
        limit: 10,
        minLimit: 1,
        maxLimit: 100,
        fileButtons: ['pdf', 'excel', 'print', 'csv'],
        makeTable: makeTable,
    });
});
$(document).on('click', '.row-delete', function (e) {
    e.preventDefault();
    const url = $(this).attr('href');
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
            const id = $(this).data('id');
            onDelete(id);
        }
    });
});

