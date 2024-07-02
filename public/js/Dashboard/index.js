import Tables from "../Tables/tables.js";
import DashboardSideBar from "./components/sidebar.js";
import { mainPageStyles, injectStyles } from "./components/styles.js"; // Adjust the path as needed

// TODO: adsjfklajdsfkljadsfkljal;dsfj ladsfjiamgoinginsane

class Dashboard {
    constructor() {
        this.tables = new Tables({ target: '#dashboard-content' });
        this.init();
    }

    init() {
        injectStyles(mainPageStyles); // Inject the styles into the document
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
            <div class="shapecontainer">
                <div id="main-page">
                    <div id="welcome">
                        <h1>Welcome to</h1>
                            <img src="/storage/images/GlitzVogue.png" alt="GLITZVOGUE Logo" class="glitzvogue-logo">
                        <p>We cater to individuals regardless of gender to suffice your needs and wants in terms of cosmetic products</p>
                    </div>
                </div>
                <div class="circle-container">
                    ${Array(10).fill('<div class="circle"></div>').join('')}
                </div>
            </div>
        `;
        $('#dashboard-content').html(mainPageContent);
    }
}

new Dashboard();
