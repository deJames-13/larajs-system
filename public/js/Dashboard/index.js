import Tables from "../Tables/tables.js";
import DashboardSideBar from "./components/sidebar.js";

// TODO: adsjfklajdsfkljadsfkljal;dsfj ladsfjiamgoinginsane


class Dashboard {
    constructor() {
        this.tables = new Tables({ target: '#dashboard-content' });
        this.init();
    }

    init() {
        DashboardSideBar.init({
            target: '#dashboard-sidebar',
            callback: this.getTable.bind(this)
        });
    }

    getTable(url) {
        $('#dashboard-content').html('');
        switch (url) {
            case 'products':
                this.tables.getProducts();
                break;
            case 'brands':
                this.tables.getBrands();
                break;
            case 'promos':
                this.tables.getPromos();
                break;
            case 'categories':
                this.tables.getCategories();
                break;
            case 'orders':
                this.tables.getOrders();
                break;


            default:
                break;
        }
    }



}

new Dashboard();