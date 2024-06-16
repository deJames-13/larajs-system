import DataTable from '/js/components/DataTable.js';

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
            <div class="print:hidden flex flex-wrap items-center justify-end gap-2">
                <a id="view-btn__${product.id}" href="/products/${product.id}" data-id="${product.id}" class="view-btn btn btn-primary btn-xs">View</a>
                <a id="delete-btn__${product.id}" href="/admin/products/edit/${product.id}" data-id="${product.id}" class="edit-btn btn btn-info btn-xs">Edit</a>
                <button id="delete-btn__${product.id}" data-id="${product.id}" class="delete-btn btn btn-error btn-xs">Delete</button>
            </div>
            `,


        };
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

