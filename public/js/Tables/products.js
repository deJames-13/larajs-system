import TablePage from './table.js';


export default class ProductsPage extends TablePage {
    constructor({ target }) {
        super({
            target: target,
            table: 'products',
        });
    }
    static init({ target }) {
        const instance = new ProductsPage({ target });
        return instance;
    }

    makeTable(data) {
        return data.map(product => ({
            "ID": `${product.id}`,
            "Name": `${product.name}`,
            "SKU": `${product.sku_code}`,
            "Price": `${product.price}`,
            "Stock": `${product.stock}`,
            "Status": `
                <div class="badge ${this.statusColors[product.status]} gap-2">
                    ${product.status}
                </div>`,
            "": `
            <div class="print:hidden w-full flex items-center justify-end gap-3">
                <a href="/products/${product.id}" class="btn btn-xs btn-primary">View</a>
                <a href="/admin/products/edit/${product.id}/" class="btn btn-xs btn-secondary">Edit</a>
                <button id="row-delete__${product.id}" data-id="${product.id}" class="row-delete btn btn-xs bg-red-400">Delete</button>
            </div>
            `,
        }));
    }



}