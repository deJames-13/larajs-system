import Charts from "../../Charts/chart.js";

export default class MainPage {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.target = "#dashboard-content";
    this.render();
    this.charts = new Charts({ target: `${this.target} #charts-container` }); // Update target for charts
    this.charts.init();
    return this;
  }

  static init() {
    const instance = new MainPage();
    return instance;
  }

  render() {
    const HTML = /* HTML */ `
      <div class="rounded-t-lg overflow-clip">
        <div class="custom-circle-border bottom-pattern p-10 relative">
          <!-- Greeting Card -->
          <div class="welcome-card bg-primary">
            <div class=" flex flex-col items-start gap-4 text-white text-3xl">
              <h1 class="text-xl">Hello, Welcome back!</h1>
              <span id="username" class="uppercase font-bold">${this.user.fullname || this.user.username}</span>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div class="stats-container mb-6">
            <div class="stats-card">
              <h3 class="stats-title">No. of Users</h3>
              <div class="stats-value">4,200</div>
            </div>
            <div class="stats-card">
              <h3 class="stats-title">No. Of Transactions</h3>
              <div class="stats-value">31K</div>
            </div>
            <div class="stats-card">
              <h3 class="stats-title">Total Earnings</h3>
              <div class="stats-value">$15,000</div>
            </div>
          </div>

          <!-- Inventory Card -->
          <div class="inventory-card mb-6">
            <h2 class="inventory-title">Inventory</h2>
            <p class="inventory-content">Here you can find details about current stock levels</p>
          </div>

          <!-- Charts Container -->
          <div id="charts-container"></div>
        </div>
      </div>
    `;
    $(this.target).html(HTML);
  }
}
