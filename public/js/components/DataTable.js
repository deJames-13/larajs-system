import ajaxRequest from '/js/assets/ajaxRequest.js';
import Pagination from "/js/components/Paginate.js";

const defaultProps = {
    baseApi: '/api/tables/',
    data: [],
    fileButtons: [],
    limit: 10,
    makeTable: () => { },
    maxLimit: 50,
    minLimit: 10,
    parent: '',
    table: [],
    tableId: '',
    tableName: '',
    tableTitle: '',
    withImport: true,
    withActions: true,
}

// DOCS HERE
/**
 * DataTable class
    * @param {Object} props - The properties of the DataTable
    * @param {string} props.parent - The parent element to render the DataTable
    * @param {string} props.tableId - The id of the table element
    * @param {string} props.tableName - The name of the table
    * @param {string} props.tableTitle - The title of the table
    * @param {number} props.limit - The limit of the table
    * @param {number} props.minLimit - The minimum limit of the table
    * @param {number} props.maxLimit - The maximum limit of the table
    * @param {Array} props.data - The data of the table
    * @param {Array} props.table - The table of the data
    * @param {Array} props.fileButtons - The file buttons of the table
    * @param {Function} props.makeTable - The function to make the table
    * @returns {Object} - The DataTable object

 */
export default class DataTable {
    constructor(props = {}) {
        Object.assign(this, defaultProps, props);

        // TODO: Other queries like sorting 
        this.query = {
            search: '',
            limit: this.limit,
            minLimit: this.minLimit,
            maxLimit: this.maxLimit,
            page: 1,
        }
        this.html = '';
        this.element = null;
        this.showPrint = this.showPrint.bind(this);
        this.makePdf = this.makePdf.bind(this);
        this.makeExcel = this.makeExcel.bind(this);
        this.makeCsv = this.makeCsv.bind(this);

        this.queryCallback = ({ data }) => this.updateTable(data);
        return this.render().fetchData({ onFetch: this.queryCallback });
    }

    showPrint() {
        this.element.printThis({ pageTitle: `${this.tableTitle}` });
    }

    // bindImport() {
    //     const form = $('#import-form');
    //     form.submit((e) => {
    //         e.preventDefault();
    //         const formData = new FormData(form[0]);
    //         ajaxRequest.post({
    //             url: '/api/imports/' + this.tableName,
    //             token: document.querySelector('meta[name="api-token"]').getAttribute('content'),
    //             data: formData,
    //             onSuccess: (response) => {
    //                 console.log(response);
    //             },
    //             onError: (error) => console.log(error)
    //         });
    //     });
    // }

    makeExport(type = 'xlsx') {
        let fileType = 'xlsx';
        let mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        if (type === 'csv') {
            fileType = 'csv';
            mimeType = 'text/csv';
        }

        fetch('/api/exports/' + this.tableName + '/' + fileType, {
            method: 'GET',
            headers: {
                'Accept': mimeType,
                'Authorization': 'Bearer ' + document.querySelector('meta[name="api-token"]').getAttribute('content')
            }
        })
            .then(response => response.blob())
            .then(blob => {
                const fileUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = fileUrl;
                const fileName = `${this.tableName}-${new Date().toISOString().replace('.', '-')}`;
                a.download = `${fileName}.${fileType}`;
                a.click();
            });
    }
    makePdf() {
        window.location.href = '/admin/pdf/' + this.tableName;
    }
    makeExcel() {
        this.makeExport('xlsx');
    }
    makeCsv() {
        this.makeExport('csv');
    }

    makeFileButtons() {
        // TODO: PDF 
        const buttons = {
            pdf: {
                label: "PDF",
                callback: this.makePdf
            },
            csv: {
                label: "CSV",
                callback: this.makeCsv
            },
            excel: {
                label: "Excel",
                callback: this.makeExcel
            },
            print: {
                label: "Print",
                callback: this.showPrint
            },
        }
        const html = this.fileButtons.map(btn => {
            if (!buttons[btn]) return '';

            const b = $(`<button>`, {
                id: `btn-${btn}`,
                class: "btn btn-primary btn-sm",
                text: buttons[btn].label,
            });
            b.click(buttons[btn].callback);
            const parent = $('#file-buttons');
            parent.append(b);

        });
    }

    paginate(response) {
        $('#paginations').empty();
        const { links, meta } = response;
        if (links && (links.next || links.prev || meta.current_page > 1)) {
            const pagination = new Pagination(links, meta.current_page).render('#paginations');
            pagination.onClick((page) => this.handleQuery({ ...this.query, page: page }, this.queryCallback));
        }
    }

    fetchData({ onFetch = () => { }, baseApi = null, query = {} }) {
        query = { ...this.query, ...query };
        const qstr = Object.keys(query).reduce((result, key) => `${result}${key}=${query[key]}&`, '');
        const url = baseApi ?? this.baseApi + this.tableName + "?" + qstr; //console.log(url);
        const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
        this.tableName && ajaxRequest.get({
            url: url,
            token: token,
            onSuccess: (response) => {
                // console.log(response);
                onFetch(response); // maketable


                this.data = response.data;
                this.paginate(response);
                return response;
            },
            onError: (error) => console.log(error)
        });
    }

    handleQuery(query, callback = () => { }) {
        this.searchTerm = query.search || '';
        this.fetchData({
            table: this.tableName,
            query: query,
            onFetch: (response) => callback(response)
        });
    }

    getInput(id, value) {
        if (id == 'limit') {
            value = Math.max(this.query.minLimit, Math.min(this.query.maxLimit, value));
        }
        this.query[id] = value
        return this.query;
    }

    onQuery(callback = () => { }, delay = 500) {
        let timeoutId = null;
        $(`#search, #limit`).on('input', (e) => {
            const query = this.getInput(e.target.id, e.target.value);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                this.handleQuery(query, callback);
            }, delay);
        });
    }

    importExcel() {
        const formData = new FormData($('#import-form')[0]);
        ajaxRequest.post({
            url: `/admin/${this.tableName}`,
            data: formData,
            onSuccess: (response) => {
                Swal.fire(
                    'Success!',
                    'File Imported successfully',
                    'success'
                )
                this.updateTable();
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
    onDelete(id) {
        ajaxRequest.delete({
            url: `/api/${this.tableName}/${id}`,
            onSuccess: (response) => {
                Swal.fire(
                    'Deleted!',
                    'Row has been deleted.',
                    'success'
                )
                this.updateTable();
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
    createTable() {
        if (this.table.length === 0) {
            return `<div id="datatable" class="container overflow-x-auto text-center">No data found</div>`
        }
        const columns = Object.keys(this.table[0]).filter(col => typeof this.table[0][col] === 'string');
        return `
        <div class="print:w-0 print:hidden flex justify-between items-end space-x-2 py-4">
            <div class="w-full flex flex-wrap gap-2">
                <div id="file-buttons" class="flex flex-wrap gap-2 items-center">
                
                </div>
                <div id="limit-wrapper" class="container">
                    <span>Items: </span>
                    <input id="limit" type="number" min='10' value='10' max='50' class="input input-bordered input-sm max-w-[69px] max-h-[35px]" />
                </div>
            </div>
        
            <div id="paginations" class="container flex justify-end items-end">
            </div>
        </div>
        <div id="datatable" class="py-8 print:my-4 w-full print:overflow-visible overflow-auto flex items-center justify-center">
            <table id="${this.tableId}" class="table table-xs table-auto h-full w-full ">
                <thead>
                    <tr>
                        ${columns.map(column => `<th>${column}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this.table.map(row => `
                    <tr class="hover:border-secondary hover:bg-secondary hover:bg-opacity-20 hover:border-y-2 hover:scale-95 transition-all ease-in">
                        ${columns.map(column => `<td class="">${row[column]}</td>`).join('')}
                    </tr>
                `).join('')}
                </tbody>
            </table>
        </div>

    
        `
    }

    actions() {
        return `
        <div class="py-4 container flex flex-col-reverse gap-2 lg:flex-row justify-between items-center">
            <form id='import-form' method='POST' enctype='multipart/form-data' action='/admin/${this.tableName}'
                class="flex flex-col-reverse lg:flex-row gap-2 items-center">
                <!-- {{ csrf_field() }} -->
                <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
                <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
            </form>
            <div class="container flex space-x-2 justify-end align-items-center">
                <button class="btn btn-sm text-white btn-success inline-block self-end">
                    <i class="fas fa-plus"></i>
                    <a href="/admin/${this.tableName}/create">Add</a>
                </button>
                <button class="btn btn-sm text-white bg-primary inline-block self-end">
                    <a href="/admin/${this.tableName}/restore">Restore</a>
                </button>
            </div>
        </div>
        `
    }

    updateTable(data = null, raw = false) {
        if (!data) return this.render().fetchData({ onFetch: this.queryCallback });
        this.table = raw ? data : this.makeTable(data);
        return this.render();
    }

    render() {
        // TODO: PDF and EXCEL (import/export)
        const topBar = `
			<h1 class="text-3xl font-extrabold">${this.tableTitle}</h1>
            <div class="divider m-0"></div>

                <div id="search-bar" class="py-4 print:w-0 print:hidden" >
                    <div class="flex justify-end space-x-4 items-center">
                        <i class="aspect-square fas fa-magnifying-glass"></i>
                        <span>Search</span>
                        <input id="search" type="text" placeholder="" class="input input-bordered input-sm max-h-[35px]">
                    </div>
                </div>
            `;
        // const importForm = this.withImport ? `
        // <form id="import-form" class="flex justify-center space-x-2 my-4" enctype="multipart/form-data">
        // <input type="file" id="upload_${this.tableName}" name="${this.tableName}_upload" class="file-input file-input-sm  w-full max-w-xs"
        // accept=".xlsx" required>
        // <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
        // </form>
        // ` : ``;
        this.html = topBar;
        this.html += this.withActions ? this.actions() : '';
        this.html += this.createTable();//+ importForm;
        this.element = this.parent && $(`${this.parent} `).html(this.html);

        // rerender the inputs base on querym object
        Object.keys(this.query).map(key => {
            $(`#${key}`).val(this.query[key]);
        })

        this.onQuery(this.queryCallback);
        this.makeFileButtons();
        this.bindEvents();
        // this.withImport && this.bindImport();
        return this

    }
}
