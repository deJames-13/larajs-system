import TablePage from './table.js';


export default class PromosPage extends TablePage {
    constructor({ target }) {
        super({
            target: target,
            table: 'promos',
        });
    }
    static init({ target }) {
        const instance = new PromosPage({ target });
        return instance;
    }
    makeTable(data) {
        console.log(data);
        return data.map(promo => {
            return {
                "ID": `${promo.id}`,
                "Name": `${promo.name}`,
                "Slug": `${promo.slug}`,
                "Description": `${promo.description}`,
                "Image": `${promo.image}`,
                "Status": `
                <div class="badge ${this.statusColors[promo.status]} gap-2">
                    ${promo.status}
                </div>`,
                "Discount": `${promo.discount}`,
                "Start Date": `${promo.start_date}`,
                "End Date": `${promo.end_date}`,
                "": `
                <div class="print:hidden flex items-center justify-end w-full gap-3">
                    <a href="/promos/${promo.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/promos/edit/${promo.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <button id="row-delete__${promo.id}" data-id="${promo.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
            `,
            };
        });
    }


}
