import ajaxRequest from '../assets/ajaxRequest.js';
import DataTable from '../components/DataTable.js';
import { statusColors } from './config.js';

export default class UsersPage {

    constructor({ target }) {
        this.render(target);
        this.statusColors = statusColors;
        this.dataTable = new DataTable({
            parent: '#table-wrapper',
            tableId: 'usersTable',
            tableName: 'users',
            tableTitle: 'User DataTable',
            limit: 10,
            minLimit: 1,
            maxLimit: 100,
            fileButtons: ['pdf', 'excel', 'print', 'csv'],
            makeTable: this.makeTable.bind(this),
        });
        console.log(this.statusColors);
        this.bindEvents();
    }
    static init({ target }) {
        const instance = new UsersPage({ target });
        return instance;
    }
    makeTable(data) {
        return data.map(user => {
            const image = user.images && user.images.length > 0 && user.images[0].path || 'https://placehold.it/100x100';
            const info = user.info || {};
            return {
                "ID": `${user.id}`,
                "Name": `  
                <div class="flex items-center gap-3">
                    <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                        <img
                        src="${image}"
                        alt="user-image" />
                    </div>
                    </div>
                    <div>
                    <div class="font-bold">${user.fullname}</div>
                    <div class="text-sm opacity-70 font-bold">
                        @${user.username}
                    </div>
                    <div class="text-sm opacity-50">
                        ${user.email}
                    </div>
                    </div>
                </div>
                `,
                "Phone Number": `${info.phone_number || 'N/A'}`,
                "Address": `${info.address || 'N/A'}`,
                "Role": `${user.role}`,
                "Account Status": `
                <div class="badge ${this.statusColors[user.status]} gap-2">
                    ${user.status}
                </div>
                `,
                "": `
                <div class="print:hidden w-full flex items-center justify-end gap-3">
                    <a href="/users/${user.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/users/edit/${user.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <button id="row-delete__${user.id}" data-id="${user.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
                `,
            }
        });
    }

    onDelete(id) {
        ajaxRequest.delete({
            url: '/api/users/' + id,
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
            url: '/admin/users',
            data: formData,
            onSuccess: (response) => {
                Swal.fire(
                    'Success!',
                    'Users imported successfully',
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
            <div id="users-wrapper" class="flex flex-col space-y-4 items-center justify-center pb-12">

			<div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">

			</div>
            <div class="container flex flex-col-reverse gap-2 lg:flex-row justify-between items-center">
                <form id='import-form' method='POST' enctype='multipart/form-data' action='/admin/users'
                    class="flex flex-col-reverse lg:flex-row gap-2 items-center">
                    <!-- {{ csrf_field() }} -->
                    <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
                    <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
                </form>
                <div class="container flex space-x-2 justify-end align-items-center">
                    <button class="btn btn-sm text-white btn-success inline-block self-end">
                        <a href="/admin/users/create">Add User</a>
                    </button>
                    <button class="btn btn-sm text-white bg-primary inline-block self-end">
                        <a href="/admin/users/create">Restore</a>
                    </button>
                </div>
            </div>
		</div>
        `
        $(target).html(page);

    }
}
