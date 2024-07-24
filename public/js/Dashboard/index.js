import { debounce } from "../assets/debounce.js";
import logout from "../Auth/logout.js";
import Charts from "../Charts/charts.js";
import Tables from "../Tables/tables.js";
import DashboardSideBar from "./components/sidebar.js";
import MainPage from "./partials/_main.js";

class Dashboard {
  content = "#dashboard-content";
  sidebar = "#dashboard-sidebar";
  constructor() {
    this.tables = new Tables({ target: this.content });
    this.charts = new Charts({ target: this.content });
    this.init();
  }

  init() {
    // MainPage.init(); // just why?

    DashboardSideBar.init({
      target: this.sidebar,
      callback: this.goToPage.bind(this)
    });
  }

  _goToPage(url) {
    // prevent duplicate loading
    $(this.content).html("");

    const pages = {
      main: () => MainPage.init(),
      products: () => this.tables.getProducts(),
      brands: () => this.tables.getBrands(),
      promos: () => this.tables.getPromos(),
      categories: () => this.tables.getCategories(),
      orders: () => this.tables.getOrders(),
      users: () => this.tables.getUsers(),
      charts: () => this.charts.init(),
      profile: () => window.location.replace("/profile"),
      logout: logout
    };

    if (pages[url]) {
      pages[url]();
    } else {
      console.error(`Page handler not found for ${url}`);
    }
  }

  goToPage(url) {
    const go = debounce(() => {
      this._goToPage(url);
    }, 500);
    go();
  }
}

new Dashboard();
