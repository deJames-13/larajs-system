import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';

export default class PromosPage {
    constructor({ target }) {
        this.render(target);
        this.dataTable = new DataTable({
            parent: '#table-wrapper',
            tableId: 'promosTable',
            tableName: 'promos',
            tableTitle: 'Promo DataTable',
            limit: 10,
            minLimit: 1,
            maxLimit: 100,
            fileButtons: ['pdf', 'excel', 'print', 'csv'],
            makeTable: this.makeTable,
        });
        this.bindEvents();
    }
    makeTable(data) {
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

    onDelete(id) {
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
                this.dataTable.updateTable();
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


    bindEvents() {

        $(document).on('click', '.row-delete', (e) => {
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
            url: '/admin/promos',
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
            <div id="promos-wrapper" class="flex flex-col space-y-4 items-center justify-center pb-12">
                <div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">

                </div>

                <div class="container flex space-x-2 justify-end align-items-center">
                    <button class="btn text-white btn-success inline-block self-end">
                        <a href="/admin/promos/create">Add Promo</a>
                    </button>
                    <button class="btn text-white bg-primary inline-block self-end">
                        <a href="/admin/promos/create">Restore</a>
                    </button>
                </div>
                <form id="import-form" method="POST" enctype="multipart/form-data" action="/admin/promos"
                    class="flex justify-center space-x-2 my-4">
                    <!-- {{ csrf_field() }} -->
                    <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
                    <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
                </form>
		</div>
        `
        $(target).html(page);

    }
}