import Tables from "../Tables/tables.js";
import DashboardSideBar from "./components/sidebar.js";
import MainPage from "./partials/_main.js";

// TODO: adsjfklajdsfkljadsfkljal;dsfj ladsfjiamgoinginsane

class Dashboard {
    constructor() {
        this.tables = new Tables({ target: '#dashboard-content' });
        this.init();
    }

    init() {
        MainPage.init();

        DashboardSideBar.init({
            target: '#dashboard-sidebar',
            callback: this.getTable.bind(this)
        });
    }

    getTable(url) {
        $('#dashboard-content').html('');

        url === 'main' && MainPage.init();
        url === 'products' && this.tables.getProducts();
        url === 'brands' && this.tables.getBrands();
        url === 'promos' && this.tables.getPromos();
        url === 'categories' && this.tables.getCategories();
        url === 'orders' && this.tables.getOrders();
    }

}

new Dashboard();
