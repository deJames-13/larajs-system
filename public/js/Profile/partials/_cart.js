export default class CartPage {
    constructor({ target }) {
        this.target = target;
        return this.render();
    }

    render() {
        const HTML = `
        <div class="p-4 flex flex-col space-y-4">
            <div class="top flex flex-col lg:flex-row justify-between lg:items-center">
                <h2 class="text-2xl font-extrabold">Shopping Cart</h2>
                <div class="actions flex space-x-2 justify-end lg:items-center">
                    <div>
                        <button id="cart-upd" class="btn btn-primary">Update Cart</button>
                    </div>
                    <!-- <button class="back btn btn-secondary">Back</button> -->
                </div>
            </div>
            <div class="divider"></div>
            <div class="container">
                    <div class="left col-span-2 cart-table flex flex-col space-y-6">
                        <div class="container overflow-x-auto">
                            <table class="table table-xs lg:table-auto">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <td>
                                        </td>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="cart-body">

                                </tbody>


                            </table>
                        </div>
                    </div>

                    <div class="right info-container py-4 lg:px-12 ">

                        <div class="container max-md border p-2 lg:p-8 rounded shadow-xl">
                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-600">Subtotal</div>
                                <div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
                            </div>

                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-600">Shipping</div>
                                <div class="text-sm font-bold">TBC</div>
                            </div>

                            <div class="flex justify-between items-center">
                                <div class="text-sm text-gray-600">Total</div>
                                <div class="text-sm font-bold">PHP <span id="total">0.00</span></div>
                            </div>
                            <div class="divider"></div>

                            <div class="flex justify-center">
                                <a id="checkout" href="/checkout" class="btn btn-sm w-full btn-outline  btn-primary">Check Out</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        `
        $(this.target).html(HTML);
        return this;
    }
}
