import TablePage from "./table.js";

export default class BrandsPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      tableName: "brands"
    });
  }
  makeTable(data) {
    return data.map(brand => {
      const isThrashed = brand.deleted_at !== null;
      return {
        ID: `${brand.id}`,
        Name: `${brand.name}`,
        Company: `${brand.company}`,
        Website: `${brand.website}`,
        Description: `${brand.description}`,
        Status: `
                    <div class="badge ${this.statusColors[brand.status]} gap-2">
                        ${brand.status}
                    </div>`,
        "": `
                <div name="actions" class=" ${isThrashed ? "hidden" : "flex"} actions print:hidden w-full items-center justify-end gap-3">
                    <a href="/brands/${brand.id}" class="btn btn-xs btn-primary">View</a>
                    <button id="row-edit__${brand.id}" data-id="${brand.id}" class="row-edit btn btn-xs bg-secondary text-white">Edit</button>
                    <button id="row-delete__${brand.id}" data-id="${brand.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
                <div name="alt-action" class=" ${!isThrashed ? "hidden" : "flex"} alt-action print:hidden w-full items-center justify-end gap-3">
                    <button id="row-restore__${brand.id}" data-id="${brand.id}" class="row-restore btn btn-xs text-white bg-green-400">Restore</button>
                </div>
                `
      };
    });
  }
}
