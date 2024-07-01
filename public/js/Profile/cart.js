import Cart from "../Transaction/cart.js";
import CartPage from "./partials/_cart.js";

export default class MyCart {
    constructor() {
        this.target = '#profile-content';
        this.cart = null;
        this.render();
        return this;
    }
    static init() {
        const instance = new MyCart();
        return instance;
    }

    render() {
        const cartCard = new CartPage({ target: this.target });
        this.cart = new Cart();
        return this;
    }
}