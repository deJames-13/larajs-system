import TablePage from "./table.js";

export default class PromosPage extends TablePage {
  constructor({ target }) {
    super({
      target: target,
      tableName: "promos"
    });
  }
  makeTable(data) {
    return data.map(promo => {
      const isThrashed = promo.deleted_at !== null;
      return {
        ID: `${promo.id}`,
        Name: `${promo.name}`,
        Slug: `${promo.slug}`,
        Description: `${promo.description}`,
        Image: `<img src="${promo.image}" alt="${promo.name}" class="w-16 h-16 object-cover"/>`,
        Status: `
                    <div class="badge ${this.statusColors[promo.status]} gap-2">
                        ${promo.status}
                    </div>`,
        Discount: `${promo.discount}`,
        "Start Date": `${promo.start_date}`,
        "End Date": `${promo.end_date}`,
        "": `
            <div name="actions" class=" ${isThrashed ? "hidden" : "flex"} actions print:hidden w-full items-center justify-end gap-3">
                <button id="row-view__${promo.id}" data-id="${promo.id}" class="row-view btn btn-xs btn-primary">View</button>
                <button id="row-edit__${promo.id}" data-id="${promo.id}" class="row-edit btn btn-xs bg-secondary text-white">Edit</button>
                <button id="row-delete__${promo.id}" data-id="${promo.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </div>

            <div name="alt-action" class=" ${!isThrashed ? "hidden" : "flex"} alt-action print:hidden w-full items-center justify-end gap-3">
                <button id="row-restore__${promo.id}" data-id="${promo.id}" class="row-restore btn btn-xs text-white bg-green-400">Restore</button>
            </div>
                `
      };
    });
  }
}
