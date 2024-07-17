import ajaxRequest from "/js/assets/ajaxRequest.js";
import Pagination from "/js/components/Paginate.js";

const defaultProps = {
  baseApi: "/api/",
  data: [],
  fileButtons: [],
  limit: 10,
  makeTable: () => {},
  maxLimit: 50,
  minLimit: 10,
  parent: "",
  table: [],
  tableId: "",
  tableName: "",
  tableTitle: "",
  html: "",
  element: null,
  withImport: true,
  withActions: true
};

export default class DataTable {
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.tableId = this.tableId || this.tableName + "Table";

    // TODO: Other queries like sorting
    this.query = {
      search: "",
      limit: this.limit,
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      page: 1
    };
    this.showPrint = this.showPrint.bind(this);
    this.makePdf = this.makePdf.bind(this);
    this.makeExcel = this.makeExcel.bind(this);
    this.makeCsv = this.makeCsv.bind(this);
    this.queryCallback = ({ data }) => this.updateTable(data);

    this.init();
    return this;
  }

  init() {
    this.render();
    this.makeFileButtons();
    this.bindActions();
    this.onQuery(this.queryCallback);

    Object.keys(this.query).map(key => {
      $(`#${key}`).val(this.query[key]);
    });

    this.fetchData({ onFetch: this.queryCallback });
    this.checkParams();
  }

  checkParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get("table");
    if (table === "thrashed") {
      this.showThrashed();
    }
  }

  showPrint() {
    this.element.printThis({ pageTitle: `${this.tableTitle}` });
  }

  importExcel() {
    const formData = new FormData($("#import-form")[0]);
    ajaxRequest.post({
      url: `/import/${this.tableName}`,
      data: formData,
      onSuccess: response => {
        Swal.fire("Success!", "File Imported successfully", "success");
        this.updateTable();
      },
      onError: response => {
        Swal.fire("Oops!", "Something went wrong...", "error");
      }
    });
  }

  exportTo(type = "xlsx") {
    let fileType = "xlsx";
    let mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    if (type === "csv") {
      fileType = "csv";
      mimeType = "text/csv";
    }

    fetch("/api/exports/" + this.tableName + "/" + fileType, {
      method: "GET",
      headers: {
        Accept: mimeType,
        Authorization: "Bearer " + document.querySelector('meta[name="api-token"]').getAttribute("content")
      }
    })
      .then(response => response.blob())
      .then(blob => {
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileUrl;
        const fileName = `${this.tableName}-${new Date().toISOString().replace(".", "-")}`;
        a.download = `${fileName}.${fileType}`;
        a.click();
      });
  }

  makePdf() {
    window.location.href = "/pdf/" + this.tableName;
  }

  makeExcel() {
    this.exportTo("xlsx");
  }

  makeCsv() {
    this.exportTo("csv");
  }

  makeFileButtons() {
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
      }
    };
    const html = this.fileButtons.map(btn => {
      if (!buttons[btn]) return "";

      const b = $("<button>", {
        id: `btn-${btn}`,
        class: "btn btn-primary btn-sm",
        text: buttons[btn].label
      });
      b.click(buttons[btn].callback);
      const parent = $("#file-buttons");
      parent.append(b);
    });
  }

  paginate(response) {
    $("#paginations").empty();
    const { links, meta } = response;
    if (links && (links.next || links.prev || meta.current_page > 1)) {
      const pagination = new Pagination(links, meta.current_page).render("#paginations");
      pagination.onClick(page => this.handleQuery({ ...this.query, page: page }, this.queryCallback));
    }
  }

  fetchData({ onFetch = () => {}, baseApi = null, query = {} }) {
    query = { ...this.query, ...query };
    const qstr = Object.keys(query).reduce((result, key) => `${result}${key}=${query[key]}&`, "");
    const url = baseApi ?? this.baseApi + this.tableName + "?" + qstr; //console.log(url);
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");
    this.tableName &&
      ajaxRequest.get({
        url: url,
        token: token,
        onSuccess: response => {
          // console.log(response);
          onFetch(response); // maketable

          this.data = response.data;
          this.paginate(response);
          return response;
        },
        onError: error => console.log(error)
      });
  }

  handleQuery(query, callback = () => {}) {
    this.searchTerm = query.search || "";
    this.fetchData({
      table: this.tableName,
      query: query,
      onFetch: response => callback(response)
    });
  }

  getInput(id, value) {
    if (id == "limit") {
      value = Math.max(this.query.minLimit, Math.min(this.query.maxLimit, value));
    }
    this.query[id] = value;
    return this.query;
  }

  onQuery(callback = () => {}, delay = 500) {
    let timeoutId = null;
    $(`#search, #limit`).on("input", e => {
      const query = this.getInput(e.target.id, e.target.value);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        this.handleQuery(query, callback);
      }, delay);
    });
  }

  bindActions() {
    $(document).ready(() => {
      $(document).on("click", ".row-delete", e => {
        const id = $(e.target).data("id");
        this.confirmAction(() => this.handleDelete(id));
      });
      $(document).on("click", ".row-restore", e => {
        const id = $(e.target).data("id");
        this.confirmAction(() => this.handleRestore(id));
      });
    });
    $("#alt-action").hide();
    $("#btn-trash-" + this.tableName).on("click", () => {
      this.showThrashed();
      $("#btn-trash-" + this.tableName).hide();
      $("#btn-table-" + this.tableName).show();
      $(".actions").hide();
      $(".alt-action").show();
    });
    $("#btn-table-" + this.tableName).on("click", () => {
      this.showNotThrashed();
      $("#btn-table-" + this.tableName).hide();
      $("#btn-trash-" + this.tableName).show();
      $(".actions").show();
      $(".alt-action").hide();
    });
    $("#import-form").on("submit", e => {
      e.preventDefault();
      this.importExcel();
    });
  }

  confirmAction(callback = () => {}) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  handleRestore(id) {
    ajaxRequest.put({
      url: `/api/${this.tableName}/${id}/restore`,
      onSuccess: response => {
        Swal.fire("Restored!", "Row has been restored.", "success");
        this.updateTable();
      },
      onError: response => {
        Swal.fire("Oops!", "Something went wrong...", "error");
      }
    });
  }

  handleDelete(id) {
    ajaxRequest.delete({
      url: `/api/${this.tableName}/${id}`,
      onSuccess: response => {
        Swal.fire("Deleted!", "Row has been deleted.", "success");
        this.updateTable();
      },
      onError: response => {
        Swal.fire("Oops!", "Something went wrong...", "error");
      }
    });
  }

  actions() {
    return /* HTML */ `
      <div class="print:hidden py-4 w-full overflow-auto flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <form id="import-form" method="POST" enctype="multipart/form-data" action="/import/${this.tableName}" class="flex flex-col lg:flex-row gap-2 lg:items-center">
          <!-- {{ csrf_field() }} -->
          <input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required />
          <button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
        </form>
        <div id="action-buttons" class="flex space-x-2 justify-end align-items-center">
          <button id="btn-add-${this.tableName}" class="btn btn-sm text-white btn-success inline-block self-end">
            <i class="fas fa-plus"></i>
            <span>Add</span>
          </button>
          <button id="btn-trash-${this.tableName}" class="btn btn-sm text-white bg-primary inline-block self-end">
            <span>Trash</span>
          </button>
          <button style="display: none;" id="btn-table-${this.tableName}" class="btn btn-sm text-white bg-primary inline-block self-end">
            <span>View Table</span>
          </button>
        </div>
      </div>
    `;
  }

  showThrashed() {
    this.baseApi = this.baseApi + "thrashed/";
    this.updateTable();

    $("#table-title").after(`<h2 class="text-xl font-bold text-gray-600 text-left"> Retrieve thrashed records. </h2>`);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("table", "thrashed");
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, null, newUrl);
  }

  showNotThrashed() {
    this.baseApi = this.baseApi.replace("thrashed/", "");
    $("#table-title").next().remove();
    this.updateTable();
  }

  createTable() {
    if (this.table.length === 0) {
      return /* HTML */ `<div id="datatable" class="w-full overflow-auto text-center">No data found</div>`;
    }
    const columns = Object.keys(this.table[0]).filter(col => typeof this.table[0][col] === "string");
    return /* HTML */ `
      <div id="datatable" class="py-8 w-full overflow-auto flex print:my-4 print:overflow-visible">
        <table id="${this.tableId}" class="table table-xs table-auto h-full w-full">
          <thead>
            <tr>
              ${columns.map(column => `<th>${column}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${this.table
              .map(
                row => `
                    <tr class="hover:border-secondary hover:bg-secondary hover:bg-opacity-20 hover:border-y-2 hover:scale-95 transition-all ease-in">
                        ${columns.map(column => `<td class="">${row[column]}</td>`).join("")}
                    </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  updateTable(data = null, raw = false) {
    if (!data) return this.fetchData({ onFetch: this.queryCallback });
    this.table = raw ? data : this.makeTable(data);
    this.element.find("#datatable").html(this.createTable());
  }

  render() {
    const topBar = /* HTML */ `
      <h1 id="table-title" class="text-3xl font-extrabold">${this.tableTitle}</h1>

      <div class="divider m-0"></div>

      <div id="search-bar" class="py-4 print:w-0 print:hidden">
        <div class="flex justify-end space-x-4 items-center">
          <i class="aspect-square fas fa-magnifying-glass"></i>
          <span>Search</span>
          <input id="search" type="text" placeholder="" class="input input-bordered input-sm max-h-[35px]" />
        </div>
      </div>
      <div class="print:w-0 print:hidden flex justify-between items-end space-x-2 py-4">
        <div class="w-full flex flex-wrap gap-2">
          <div id="file-buttons" class="flex flex-wrap gap-2 items-center"></div>
          <div id="limit-wrapper" class="container">
            <span>Items: </span>
            <input id="limit" type="number" min="10" value="10" max="50" class="input input-bordered input-sm max-w-[69px] max-h-[35px]" />
          </div>
        </div>

        <div id="paginations" class="container flex justify-end items-end"></div>
      </div>
    `;

    this.html = topBar;
    this.html += this.withActions ? this.actions() : "";
    this.html += this.createTable();
    this.element = $(`${this.parent} `).html(this.html);

    return this;
  }
}
