import BrandsPage from './brands.js';
import CategoriesPage from './categories.js';
import OrdersPage from './orders.js';
import ProductsPage from './products.js';
import PromosPage from './promos.js';


export default class Tables {
    constructor({ target }) {
        this.target = target;
    }

    getProducts() {
        new ProductsPage({ target: this.target });
    }

    getBrands() {
        new BrandsPage({ target: this.target });
    }

    getCategories() {
        new CategoriesPage({ target: this.target });

    }

    getPromos() {
        new PromosPage({ target: this.target })
    }

    getOrders() {
        new OrdersPage({ target: this.target });
    }

}