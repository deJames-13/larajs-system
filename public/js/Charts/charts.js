import CustomerPerAddress from "./customer-per-address.js";
import OrderPerMonth from "./order-per-month.js";
import OrdersRevenue from "./orders-revenue.js";
import ProductsSold from "./products-sold.js";

export default class Charts {
  constructor({ target }) {
    this.target = target;
    this.customerPerAddress = new CustomerPerAddress({ target: "#customer-per-address" });
    this.orderPerMonth = new OrderPerMonth({ target: "#order-per-month" });
    this.ordersRevenue = new OrdersRevenue({ target: "#orders-revenue" });
    this.productsSold = new ProductsSold({ target: "#products-sold" });
  }
  init() {
    this.showAllCharts();
  }

  getCustomerPerAddress() {
    this.customerPerAddress.render();
  }

  getOrderPerMonth() {
    this.orderPerMonth.render();
  }

  getOrdersRevenue() {
    this.ordersRevenue.render();
  }

  getProductsSold() {
    this.productsSold.render();
  }

  showAllCharts() {
    $(this.target).html(/* HTML */ `
      <div class="flex justify-center flex-wrap items-center gap-4">
        <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
          <h2 class="font-bold text-xl">Order Per Month</h2>
          <div class="p-4 w-full h-full"><canvas id="order-per-month"></canvas></div>
        </div>
        <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
          <h2 class="font-bold text-xl">Orders Revenue</h2>
          <div class="p-4 w-full h-full"><canvas id="orders-revenue" class="w-full h-full"></canvas></div>
        </div>
        <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
          <h2 class="font-bold text-xl">Products Sold</h2>
          <div class="p-4 w-full h-full"><canvas id="products-sold"></canvas></div>
        </div>
        <div class="border container bg-base-100 rounded-lg shadow-xl p-4">
          <h2 class="font-bold text-xl">Customer Per Address</h2>
          <div class="p-4 w-full h-full"><canvas id="customer-per-address" class="w-full h-full"></canvas></div>
        </div>
      </div>
    `);

    this.getCustomerPerAddress();
    this.getOrderPerMonth();
    this.getOrdersRevenue();
    this.getProductsSold();
  }
}
