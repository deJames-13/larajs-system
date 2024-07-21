import TablePage from "./table.js";
var filters = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "status", label: "Status" },
  { value: "stock", label: "Stock" }
];
var sortBy = {
  display: true,
  filters: filters,
  selected: filters[0],
  order: "desc"
};
export default class ProductsPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      tableName: "products",
      sortBy: sortBy
    });
  }
  mapFilters(data) {
    return data.map(item => {
      return {
        value: item.id,
        label: item.name
      };
    });
  }
  makeTable(data) {
    return data.map(product => {
      const isThrashed = product.deleted_at !== null;

      return {
        ID: `${product.id}`,
        Name: `${product.name}`,
        SKU: `${product.sku_code}`,
        Price: `${product.price}`,
        Stock: `${product.stock}`,
        Status: `
                <div class="badge ${this.statusColors[product.status]} gap-2">
                    ${product.status}
                </div>`,
        "": `
            <div name="actions" class=" ${isThrashed ? "hidden" : "flex"} actions print:hidden w-full items-center justify-end gap-3">
                  <button id="row-view__${product.id}" data-id="${product.id}" class="row-view btn btn-xs btn-primary">View</button>
                <button id="row-edit__${product.id}" data-id="${product.id}" class="row-edit btn btn-xs bg-secondary text-white">Edit</button>
                <button id="row-delete__${product.id}" data-id="${product.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </div>
            <div name="alt-action" class=" ${!isThrashed ? "hidden" : "flex"} alt-action print:hidden w-full items-center justify-end gap-3">
                <button id="row-restore__${product.id}" data-id="${product.id}" class="row-restore btn btn-xs text-white bg-green-400">Restore</button>
            </div>
            `
      };
    });
  }
}
