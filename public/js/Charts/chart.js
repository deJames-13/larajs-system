import LowStock from "./low-stock.js";
import NoStock from "./no-stock.js";

export default class Charts {
  constructor({ target }) {
    this.target = target;
    this.lowStock = new LowStock({ target: this.target });
    this.noStock = new NoStock({ target: this.target });
  }

  init() {
    this.showAllCharts();
  }

  getLowStock() {
    this.lowStock.render();
  }

  getNoStock() {
    this.noStock.render();
  }

  showAllCharts() {
    $(this.target).html(/*HTML*/ `
        <div class="relative flex items-center justify-center">
          <div class="mainpage-charts-container p-4 py-8">
            <div class="mainpage-chart-card">
              <h3 class="chart-heading">Low Stock</h3>
              <div class="chart-container bg-transparent"><canvas id="low-stock"></canvas></div>
            </div>
            <div class="mainpage-chart-card">
              <h3 class="chart-heading">No Stock</h3>
              <div class="chart-container bg-transparent"><canvas id="no-stock"></canvas></div>
              <div id="no-stock-message"></div>
            </div>
          </div>
        </div>
    `);

    this.getLowStock();
    this.getNoStock();
  }
}
