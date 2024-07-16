import TablePage from "./table.js";

export default class CategoriesPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      table: "categories"
    });
  }
  static init({ target }) {
    const instance = new CategoriesPage({ target });
    return instance;
  }

  makeTable(data) {
    console.log(data);
    return data.map(category => {
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
                <div class="print:hidden flex items-center justify-end w-full gap-3">
                    <a href="/categories/${category.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/categories/edit/${category.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <button id="row-delete__${category.id}" data-id="${category.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
            `
      };
    });
  }
}
