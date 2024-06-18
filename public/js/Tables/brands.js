import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';


var dataTable
const makeTable = (data) => {
    console.log(data);
    return data.map(brand => {
        return {
            "ID": `${brand.id}`,
            "Company": `${brand.company}`,
            "Website": `${brand.website}`,
            "": `
            <div class="print:hidden flex items-center flex-end w-full gap-3">
            <a href="/brands/${brand.id}" class="btn btn-xs btn-primary">View</a>
            <a href="/admin/brands/edit/${brand.id}/" class="btn btn-xs btn-secondary">Edit</a>
            <form id="row_delete__${brand.id}" data-id="${brand.id}" method="POST">
                <button type="submit" data-id="${brand.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </form>
        </div>
            `,

        };
    });
}

$(document).ready(function () {
    dataTable = new DataTable({
        parent: '#table-wrapper',
        tableId: 'brandsTable',
        tableName: 'brands',
        tableTitle: 'Brands DataTable',
        limit: 10,
        minLimit: 1,
        maxLimit: 100,
        fileButtons: ['pdf', 'excel', 'print', 'csv'],
        makeTable: makeTable,
    });
});
