import CustomerPerAddress from "./customer-per-address.js";
import OrderPerMonth from "./order-per-month.js";
import OrdersRevenue from "./orders-revenue.js";
import ProductsSold from "./products-sold.js";

export default class Charts {
  constructor({ target }) {
    this.target = target;
    this.customerPerAddress = new CustomerPerAddress({ target });
    this.orderPerMonth = new OrderPerMonth({ target });
    this.ordersRevenue = new OrdersRevenue({ target });
    this.productsSold = new ProductsSold({ target });
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
}
