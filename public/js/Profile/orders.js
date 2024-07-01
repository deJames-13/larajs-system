import OrderManager from "../Orders/index.js";
import OrderPage from "./partials/_orders.js";
export default class MyOrders {
    constructor() {
        this.target = '#profile-content';
        this.order = null;

        return this.render();

    }

    static init() {
        const instance = new MyOrders();
        return instance;
    }

    render() {
        const orderCard = new OrderPage({ target: this.target });
        this.order = new OrderManager();

        return this;
    }
}