import BrandsForm from "../Brands/form.js";
import CategoriesForm from "../Categories/form.js";
import DataTable from "../components/DataTable.js";
import ProductsForm from "../Products/form.js";
import PromosForm from "../Promos/form.js";
import { statusColors } from "./config.js";

const formPages = {
  products: ProductsForm,
  categories: CategoriesForm,
  brands: BrandsForm,
  promos: PromosForm
};

const datatableProps = {
  parent: "#table-wrapper",
  tableId: "",
  tableName: "",
  tableTitle: "",
  limit: 10,
  minLimit: 1,
  maxLimit: 100,
  fileButtons: ["pdf", "excel", "print", "csv"],
  withActions: false,
  statusColors: statusColors
};

export default class TablePage extends DataTable {
  constructor(props = {}) {
    super(props);
    Object.assign(this, datatableProps, props);
    if (this.tableTitle !== "") this.tableTitle = tableTitle;
    else if (this.tableName && this.tableName.length > 0) this.tableTitle = this.tableName.charAt(0).toUpperCase() + this.tableName.slice(1) + " DataTable";
    else "";
    this.init();
  }
  init() {
    this.render(this.target);
    this.bindEvents();
    this.handlePage();
  }

  bindEvents() {
    const urlParams = new URLSearchParams(window.location.search);

    $(document)
      .off()
      .on("click", ".row-edit", e => {
        const id = e.target.dataset.id;
        urlParams.set("action", "edit");
        urlParams.set("id", id);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, null, newUrl);
        this.formPage(id);
      });

    $("#btn-add-" + this.table)
      .off()
      .on("click", () => {
        urlParams.set("action", "create");
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, null, newUrl);
        this.formPage();
      });
    super.bindEvents();
  }
  handlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (urlParams.get("action") === "edit" && id) {
      this.formPage(id);
    } else if (urlParams.get("action") === "create") {
      this.formPage();
    }
  }
  formPage(id) {
    const FormPage = formPages[this.tableName];
    if (!FormPage) return;
    new FormPage({
      id: id,
      target: this.target,
      name: this.tableName + `${id ? " #" + id : ""}`,
      type: id ? "edit" : "create",
      exitPage: () => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete("action");
        urlParams.delete("id");
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, null, newUrl);
        this.init();
      }
    });
  }

  render(target) {
    $(target).html("");

    const page = `
        <div class="flex flex-col space-y-4 items-center justify-center pb-12">
          <div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">
          </div>
        </div>
        `;
    $(target).html(page);
    super.render();
  }
}
