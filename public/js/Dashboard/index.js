import logout from "../Auth/logout.js";
import Tables from "../Tables/tables.js";
import Charts from "../Charts/charts.js";
import DashboardSideBar from "./components/sidebar.js";
import MainPage from "./partials/_main.js";

class Dashboard {
  constructor() {
    this.tables = new Tables({ target: "#dashboard-content" });
    this.charts = new Charts({ target: "#dashboard-content" });
    this.init();
  }

  init() {
    MainPage.init();

    DashboardSideBar.init({
      target: "#dashboard-sidebar",
      callback: this.getTable.bind(this)
    });
  }

  getTable(url) {
    $("#dashboard-content").html(""); // Clear existing content

    const pages = {
      main: () => MainPage.init(),
      products: () => this.tables.getProducts(),
      brands: () => this.tables.getBrands(),
      promos: () => this.tables.getPromos(),
      categories: () => this.tables.getCategories(),
      orders: () => this.tables.getOrders(),
      users: () => this.tables.getUsers(),
      charts: () => this.showAllCharts(),
      logout: logout
    };

    if (pages[url]) {
      pages[url]();
    } else {
      console.error(`Page handler not found for ${url}`);
    }
  }

  showAllCharts() {
    // Add canvas elements for the charts in a 2x2 grid
    $("#dashboard-content").html(`
        <div class="rounded-t-lg overflow-clip">
        <div class="custom-circle-border bottom-pattern p-10 relative">
            <div class="charts-container">
            <div class="chart-card">
                <h3 class="chart-heading">Order Per Month</h3>
                <div class="chart-container"><canvas id="order-per-month"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="chart-heading">Orders Revenue</h3>
                <div class="chart-container"><canvas id="orders-revenue"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="chart-heading">Products Sold</h3>
                <div class="chart-container"><canvas id="products-sold"></canvas></div>
            </div>
            <div class="chart-card">
                <h3 class="chart-heading">Customer Per Address</h3>
                <div class="chart-container"><canvas id="customer-per-address"></canvas></div>
            </div>
            </div>
        </div>
        </div>

    `);

    // Initialize the charts
    this.charts.getCustomerPerAddress();
    this.charts.getOrderPerMonth();
    this.charts.getOrdersRevenue();
    this.charts.getProductsSold();
  }

}

new Dashboard();
