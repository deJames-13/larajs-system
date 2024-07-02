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

        if (url === 'main') {
            this.loadMainPage();
        } else {
            url === 'products' && this.tables.getProducts();
            url === 'brands' && this.tables.getBrands();
            url === 'promos' && this.tables.getPromos();
            url === 'categories' && this.tables.getCategories();
            url === 'orders' && this.tables.getOrders();
        }
    }

    loadMainPage() {
        // Directly manipulate the DOM to load main page content
        const mainPageContent = `
        <div class="rounded-t-lg overflow-clip">
            <div class="custom-circle-border bottom-pattern p-10">
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
                <h1 class="text-5xl">HATDOG</h1>
            </div>
        </div>
        `;
        $('#dashboard-content').html(mainPageContent);
    }
}

new Dashboard();
