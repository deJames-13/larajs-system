import logout from "../Auth/logout.js";
import Charts from "../Charts/charts.js";
import Tables from "../Tables/tables.js";
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
    $("#dashboard-content").html("");

    const pages = {
      main: () => MainPage.init(),
      products: () => this.tables.getProducts(),
      brands: () => this.tables.getBrands(),
      promos: () => this.tables.getPromos(),
      categories: () => this.tables.getCategories(),
      orders: () => this.tables.getOrders(),
      users: () => this.tables.getUsers(),
      charts: () => this.charts.init(),
      logout: logout
    };

    if (pages[url]) {
      pages[url]();
    } else {
      console.error(`Page handler not found for ${url}`);
    }
  }
}

new Dashboard();
