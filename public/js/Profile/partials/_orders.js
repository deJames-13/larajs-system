export default class OrderPage {
  constructor({ target }) {
    this.target = target;
    return this.render();
  }

  render() {
    const HTML = /* HTML */ `
      <div class="p-4 flex flex-col space-y-4">
        <div class="top flex justify-between items-center">
          <h2 class="text-2xl font-extrabold">My Orders</h2>
          <div class="actions flex space-x-2 items-center">
            <button class="back btn btn-sm btn-secondary">Back</button>
          </div>
        </div>
        <div class="divider"></div>
        <div class="right cart-table flex flex-col space-y-6">
          <div class="container overflow-x-hidden">
            <!-- TABS -->
            <div class="scrollbar-hide container overflow-x-auto">
              <div role="tablist" class=" p-2 min-w-[690px] shadow-lg border rounded tabs tabs-bordered grid-cols-6">
                <button id="order-all" name="order-tabs" role="tab" class="tab text-primary tab-active" aria-label="All">All</button>

                <button id="order-pending" name="order-tabs" role="tab" class="tab" aria-label="To Pay">To Pay</button>

                <button id="order-processing" name="order-tabs" role="tab" class="tab" aria-label="To Ship">To Ship</button>

                <button id="order-shipping" name="order-tabs" role="tab" class="tab" aria-label="To Receive">To Receive</button>

                <button id="order-completed" name="order-tabs" role="tab" class="tab" aria-label="Completed">Completed</button>

                <button id="order-cancelled" name="order-tabs" role="tab" class="tab" aria-label="Cancelled">Cancelled</button>
              </div>
            </div>

            <!-- SEARCH BAR -->
            <div id="search-bar" class="my-4 px-4 py-2 bg-gray-200 border-b-2 bg-opacity-35 flex items-center space-x-4">
              <button class="btn btn-ghost">
                <i class="fas fa-magnifying-glass"></i>
              </button>
              <input type="text" class="my-2 focus:outline-none bg-transparent w-full" placeholder="You can search by Order ID or Product Name" />
            </div>
            <!-- Nothing to show -->
            <div id="no-orders">
              <div class="m-4 flex items-center justify-center space-x-4 text-2xl font-bold text-gray-500">
                <div>
                  <i class="fas fa-ban"></i>
                </div>
                <h1>No Orders Found</h1>
              </div>
            </div>

            <!-- PAGINATION -->

            <div id="paginations" class="my-2 flex justify-end"></div>

            <!-- ORDER -->
            <div id="tab-content" class="scrollbar-thin max-h-screen overflow-auto container space-y-4"></div>
          </div>
        </div>
      </div>
    `;

    $(this.target).html(HTML);
    return this;
  }
}
