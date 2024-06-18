import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

var dataTable;

const makeTable = (data) => {
    console.log(data);
    return data.map(promo => {
        return {
            "ID": `${promo.id}`,
            "Name": `${promo.name}`,
            "Slug": `${promo.slug}`,
            "Description": `${promo.description}`,
            "Image": `${promo.image}`,
            "Status": `${promo.status}`,
            "Discount": `${promo.discount}`,
            "Start Date": `${promo.start_date}`,
            "End Date": `${promo.end_date}`,
            "": `
                <div class="print:hidden flex items-center flex-end w-full gap-3">
                    <a href="/promos/${promo.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/promos/edit/${promo.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <form id="row_delete__${promo.id}" data-id="${promo.id}" method="POST">
                        <button type="submit" data-id="${promo.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                    </form>
                </div>
            `,
        };
    });
}

const onDelete = (id) => {
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.delete({
        url: '/api/promos/' + id,
        token: token,
        onSuccess: (response) => {
            Swal.fire(
                'Deleted!',
                'Promo has been deleted.',
                'success'
            );
            dataTable.updateTable();
        },
        onError: (response) => {
            Swal.fire(
                'Oops!',
                'Something went wrong...',
                'error'
            );
        },
    });
}

$(document).ready(function () {
    dataTable = new DataTable({
        parent: '#table-wrapper',
        tableId: 'promosTable',
        tableName: 'promos',
        tableTitle: 'Promo DataTable',
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
