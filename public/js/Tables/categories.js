import TablePage from "./table.js";

export default class CategoriesPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      table: "categories"
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
              <a href="/categories/${category.id}" class="btn btn-xs btn-primary">View</a>
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
