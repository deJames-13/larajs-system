import DataTable from "../components/DataTable.js";
import { statusColors } from "./config.js";

export default class TablePage {
  constructor({ target, table = null, title = null, withActions = true }) {
    this.parent = "#table-wrapper";
    this.target = target;
    this.table = table;
    this.dataTable = null;
    this.statusColors = statusColors;
    this.withActions = withActions;
    if (title) this.title = title;
    else if (this.table && this.table.length > 0) this.title = this.table.charAt(0).toUpperCase() + this.table.slice(1) + " DataTable";
    else "";
    this.init();
  }

  makeTable() {
    return [];
  }

  setDataTable() {
    this.dataTable = new DataTable({
      parent: this.parent,
      tableId: this.table + "Table",
      tableName: this.table,
      tableTitle: this.title,
      limit: 10,
      minLimit: 1,
      maxLimit: 100,
      fileButtons: ["pdf", "excel", "print", "csv"],
      makeTable: this.makeTable.bind(this),
      withActions: this.withActions
    });
  }

  init() {
    this.render(this.target);
    this.setDataTable();
    this.bindEvents();
  }
  bindEvents() {}

  render(target) {
    $(target).html("");

    const page = `
        <div class="flex flex-col space-y-4 items-center justify-center pb-12">
			<div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">
			</div>
		</div>
        `;
    $(target).html(page);
  }
}
