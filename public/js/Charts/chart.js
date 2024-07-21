import LowStock from "./low-stock.js";
import NoStock from "./no-stock.js";

export default class Charts {
  constructor({ target }) {
    this.target = target;
    this.lowStock = new LowStock({ target: "#low-stock" });
    this.noStock = new NoStock({ target: "#no-stock" });
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
        <div class="flex justify-center flex-row items-center gap-4">
          <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">Low Stock</h2>
              <div class="p-4 w-full h-full"><canvas id="low-stock"></canvas></div>
          </div>
          <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">No Stock</h2>
              <div class="p-4 w-full h-full"><canvas id="no-stock" class="w-full h-full"></canvas></div>
          </div>
        </div>
    `);

    this.getLowStock();
    this.getNoStock();
  }
}
