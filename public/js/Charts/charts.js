import CustomerPerAddress from "./customer-per-address.js";
import OrderPerMonth from "./order-per-month.js";
import OrdersRevenue from "./orders-revenue.js";
import ProductsSold from "./products-sold.js";

export default class Charts {
  constructor({ target }) {
    this.target = target;
    this.customerPerAddress = new CustomerPerAddress({ target: this.target });
    this.orderPerMonth = new OrderPerMonth({ target: this.target });
    this.ordersRevenue = new OrdersRevenue({ target: this.target });
    this.productsSold = new ProductsSold({ target: this.target });
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
    $(this.target).html(`
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

    // this.getCustomerPerAddress();
    this.getOrderPerMonth();
    this.getOrdersRevenue();
    this.getProductsSold();
  }
}
