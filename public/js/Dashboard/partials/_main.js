import Charts from "../../Charts/chart.js";

export default class MainPage {
  constructor() {
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
          <div class="welcome-card">
            <div class="welcome-message">
              <h1 class="text-2xl font-bold">Hello! Welcome Back <span id="username">Username</span></h1>
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
