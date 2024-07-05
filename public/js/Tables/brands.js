import TablePage from './table.js';


export default class BrandsPage extends TablePage {
    constructor({ target }) {
        super({
            target: target,
            table: 'brands',
        });
    }
    static init({ target }) {
        const instance = new BrandsPage({ target });
        return instance;
    }
    makeTable(data) {
        console.log(data);
        return data.map(brand => {
            return {
                "ID": `${brand.id}`,
                "Name": `${brand.name}`,
                "Company": `${brand.company}`,
                "Website": `${brand.website}`,
                "Description": `${brand.description}`,
                "Status": `
                <div class="badge ${this.statusColors[brand.status]} gap-2">
                    ${brand.status}
                </div>
                `,
                "": `
                <div class="print:hidden flex items-center justify-end w-full gap-3">
                    <a href="/brands/${brand.id}" class="btn btn-xs btn-primary">View</a>
                    <a href="/admin/brands/edit/${brand.id}/" class="btn btn-xs btn-secondary">Edit</a>
                    <button id="row-delete__${brand.id}" data-id="${brand.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
                </div>
            `,
            };
        });
    }
}