import TablePage from "./table.js";
var filters = [
  { value: "id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "slug", label: "Slug" },
  { value: "description", label: "Description" },
  { value: "status", label: "Status" },
  { value: "created_at", label: "Latest" },
  { value: "created_at_oldest", label: "Oldest" }
];
var sortBy = {
  display: true,
  filters: filters,
  selected: filters[0],
  order: "desc"
};

export default class CategoriesPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      tableName: "categories",
      sortBy: sortBy
    });
  }
  makeTable(data) {
    return data.map(category => {
      const isThrashed = category.deleted_at !== null;
      return {
        ID: `${category.id}`,
        Name: `${category.name}`,
        Slug: `${category.slug}`,
        Description: `${category.description}`,
        Status: `
          <div class="badge ${this.statusColors[category.status]} gap-2">
              ${category.status}
          </div>`,
        "": `
          <div name="actions" class=" ${isThrashed ? "hidden" : "flex"} actions print:hidden w-full items-center justify-end gap-3">
              <button id="row-view__${category.id}" data-id="${category.id}" class="row-view btn btn-xs btn-primary">View</button>
              <button id="row-edit__${category.id}" data-id="${category.id}" class="row-edit btn btn-xs bg-secondary text-white">Edit</button>
              <button id="row-delete__${category.id}" data-id="${category.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
          </div>
          <div name="alt-action" class=" ${!isThrashed ? "hidden" : "flex"} alt-action print:hidden w-full items-center justify-end gap-3">
              <button id="row-restore__${category.id}" data-id="${category.id}" class="row-restore btn btn-xs text-white bg-green-400">Restore</button>
          </div>
                `
      };
    });
  }
}
