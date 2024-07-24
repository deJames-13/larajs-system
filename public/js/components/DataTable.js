import ajaxRequest from "../assets/ajaxRequest.js";
import { hideLoading, showLoading } from "../assets/loading.js";
import Pagination from "../components/Paginate.js";

const defaultProps = {
  element: null,
  baseApi: "/api/",
  limit: 10,
  maxLimit: 50,
  minLimit: 10,
  parent: "",
  tableId: "",
  tableName: "",
  tableTitle: "",
  html: "",
  data: [],
  fileButtons: [],
  table: [],
  sortBy: {
    display: true,
    filters: [
      // { label: "Latest", value: "latest" },
      // { label: "Popular", value: "popular" },
      // { label: "Most Bought", value: "most-bought" }
    ],
    selected: { label: "ID", value: "id" },
    order: "desc",
    isThrashed: false
  },
  withImport: true,
  withActions: true
};

export default class DataTable {
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.tableId = this.tableId || this.tableName + "Table";

    // TODO: Other queries like sorting
    this.sortBy = { ...defaultProps.sortBy, ...props.sortBy };
    this.sortBy.display = this.sortBy.filters.length > 0 && this.sortBy.display;
    let sort = this.sortBy.display
      ? {
          sort: this.sortBy.selected.value,
          order: this.sortBy.order
        }
      : {};
    this.query = {
      search: "",
      limit: this.limit,
      minLimit: this.minLimit,
      maxLimit: this.maxLimit,
      page: 1,
      isThrashed: false,
      ...sort
    };
    this.showPrint = this.showPrint.bind(this);
    this.makePdf = this.makePdf.bind(this);
    this.makeExcel = this.makeExcel.bind(this);
    this.makeCsv = this.makeCsv.bind(this);

    return this;
  }

  bindEvents() {
    this.bindActions();
    this.bindQueries();
  }

  checkParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get("table");
    this.query.isThrashed = table === "thrashed";
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
    showLoading();
    $.ajax({
      url: "/api/exports/" + this.tableName + "/" + fileType,
      type: "GET",
      headers: {
        Accept: mimeType,
        Authorization: "Bearer " + $('meta[name="api-token"]').attr("content")
      },
      xhrFields: {
        responseType: "blob" // Set the response type to blob
      },
      success: blob => {
        const fileUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileUrl;
        const fileName = `${this.tableName}-${new Date().toISOString().replace(".", "-")}`;
        a.download = `${fileName}.${fileType}`;
        a.click();
        hideLoading();
      },
      error: function (xhr, status, error) {
        console.error("Request failed: " + status + ", " + error);
      }
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
      pagination.onClick(page => this.handleQuery({ ...this.query, page: page }, this.queryCallback.bind(this)));
    }
  }

  fetchData({ onFetch = () => {}, baseApi = null, query = {} }) {
    query = { ...this.query, ...query };
    // console.log(query);
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
    $(document)
      .on("click", ".row-delete", e => {
        const id = $(e.target).data("id");
        this.confirmAction(() => this.handleDelete(id));
      })
      .on("click", ".row-restore", e => {
        const id = $(e.target).data("id");
        this.confirmAction(() => this.handleRestore(id));
      });

    $("#btn-trash-" + this.tableName)
      .off()
      .on("click", () => {
        this.showThrashed();
        $(".actions, " + "#btn-trash-" + this.tableName).hide();
        $(".alt-action, " + "#btn-table-" + this.tableName).show();
      });
    $("#btn-table-" + this.tableName)
      .off()
      .on("click", () => {
        this.showNotThrashed();
        $(".actions, " + "#btn-trash-" + this.tableName).show();
        $(".alt-action, " + "#btn-table-" + this.tableName).hide();
      });

    $("#import-form")
      .off()
      .on("submit", e => {
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
    this.query.isThrashed = true;
    if (!this.baseApi.endsWith("thrashed/")) {
      this.baseApi += "thrashed/";
    }
    this.updateTable();

    $("#table-title").after(`<h2 class="text-xl font-bold text-gray-600 text-left"> Retrieve thrashed records. </h2>`);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("table", "thrashed");
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, null, newUrl);
  }

  showNotThrashed() {
    this.query.isThrashed = false;
    this.baseApi = this.baseApi.replace("thrashed/", "");
    this.updateTable();

    $("#table-title").next().remove();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("table");
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, null, newUrl);
  }

  bindQueries() {
    this.onQuery(this.queryCallback.bind(this));

    // toggle order btn
    this.sortBy.display &&
      $("#order-btn")
        .off()
        .on("click", e => {
          const order = this.query.order === "desc" ? "asc" : "desc";
          const btn = $(`[data-order=${this.query.order}]`);
          btn.attr("data-order", order);
          btn.find(`[name=${this.query.order}]`).hide();
          btn.find(`[name=${order}]`).show();
          this.query.order = order;
          this.handleQuery(this.query, this.queryCallback.bind(this));
        });

    // sort select
    $("#sort-select select")
      .off()
      .on("change", e => {
        this.query.sort = e.target.value;
        this.handleQuery(this.query, this.queryCallback.bind(this));
      });
  }

  renderQueries() {
    const sort = /* HTML */ `
      <div id="sort-by" class="my-2 flex justify-end items-center gap-2">
        <label for="sort-by" class="text-sm">Sort by: </label>

        <div id="sort-select" class="flex items-center gap-1 border border-gray-300 rounded-full focus-within:outline-double focus-within:outline-gray-300">
          <!-- Order Button Toggler -->
          <button data-order="desc" type="button" id="order-btn" class="btn btn-sm btn-ghost aspect-square">
            <i name="desc" class="fas fa-arrow-down-wide-short"></i>
            <i style="display: none;" name="asc" class="fas fa-arrow-down-short-wide"></i>
          </button>

          <select class="w-fit input input-sm rounded-full focus:outline-none border-none">
            ${this.sortBy.filters.map(filter => `<option value="${filter.value}">${filter.label}</option>`).join("")}
          </select>
        </div>
      </div>
    `;

    const HTML = /* HTML */ `
      <div class="w-full flex flex-grow flex-wrap gap-2">
        <div class="w-full flex flex-wrap gap-2 items-center">
          <!-- View Limit -->
          <div id="limit-wrapper" class="text-sm">
            <span>Items: </span>
            <input id="limit" type="number" min="10" value="10" max="50" class="input input-bordered input-sm max-w-[69px] max-h-[35px]" />
          </div>
          <!-- Sort By -->
          ${this.sortBy.display ? sort : ""}
        </div>
      </div>
    `;

    return HTML;
  }

  makeTable() {
    return [];
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
  queryCallback({ data }) {
    this.updateTable(data);
  }

  updateTable(data = null, raw = false) {
    if (!data) return this.fetchData({ onFetch: this.queryCallback.bind(this) });
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

      <div id="file-buttons" class="flex flex-wrap gap-2 items-center"></div>

      <div class="print:w-0 print:hidden flex justify-between items-end space-x-2 py-4">
        <!-- Queries -->
        ${this.renderQueries()}
        <!-- Paginations -->
        <div id="paginations" class="flex justify-end items-end"></div>
      </div>
    `;

    this.html = topBar;
    this.html += this.withActions ? this.actions() : "";
    this.html += this.createTable();
    this.element = $(`${this.parent} `).html(this.html);

    this.makeFileButtons();
    Object.keys(this.query).map(key => {
      $(`#${key}`).val(this.query[key]);
    });

    this.checkParams();
    if (this.query.isThrashed) this.showThrashed();
    else this.fetchData({ onFetch: this.queryCallback.bind(this) });
    this.bindEvents();
    return this;
  }
}
