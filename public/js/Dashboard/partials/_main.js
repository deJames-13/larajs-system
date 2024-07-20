import ajaxRequest from "../../assets/ajaxRequest.js";
import Charts from "../../Charts/chart.js";

export default class MainPage {
  constructor() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.target = "#dashboard-content";
    this.metadata = {};
    this.render();
    this.getMetadata().then(() => this.populate());
    this.charts = new Charts({ target: `${this.target} #charts-container` }).init();
    return this;
  }

  static init() {
    const instance = new MainPage();
    return instance;
  }

  getMetadata() {
    return ajaxRequest.get({
      url: "/api/orders/metadata",
      onSuccess: data => {
        console.log(data);
        this.metadata = data;
      }
    });
  }

  populate() {
    const { totalEarned, ordersCount, pendingOrders, shippingOrders, completedOrders, monthlyEarned, monthlyOrdersCount, customerCount } = this.metadata;
    $("#total-earned").text(`$${totalEarned}`);
    $("#orders-count").text(ordersCount);
    $("#monthly-orders-earned").text(`$${monthlyEarned}`);
    $("#monthly-orders-count").text(monthlyOrdersCount);
    $("#customers-count").text(customerCount);
    $("#pending-count").text(pendingOrders);
    $("#shipping-count").text(shippingOrders);
    $("#completed-count").text(completedOrders);
  }

  render() {
    const HTML = /* HTML */ `
      <div class="h-full flex flex-col lg:flex-row gap-4 rounded-t-lg overflow-auto xl:p-4">
        <!-- Left -->
        <div class="h-full flex flex-1 flex-col gap-4">
          <!-- Greeting Card -->
          <div class="relative h-64 p-8 px-4 bg-primary bg-opacity-20 border border-primary border-opacity-50 rounded-lg">
            <div class="flex flex-col items-start text-3xl">
              <h1 class="text-2xl  font-light">Welcome back!</h1>
              <span id="username" class=" capitalize font-extrabold text-4xl z-[5]">${this.user.fullname || this.user.username}</span>
            </div>
            <button class="mt-16 btn bg-primary bg-opacity-60 text-white uppercase border-none hover:bg-secondary">View Profile</button>

            <!-- Image Greeting -->
            <div class="hidden xl:block absolute bottom-0 right-0 z-[2] h-full max-w-sm overflow-clip">
              <img src="/images/man-greeting-no-bg.png" alt="hello" />
            </div>
          </div>
          <div class="h-full flex justify-center items-center gap-4">
            <div class="h-full relative border container border-yellow-400 bg-yellow-400 bg-opacity-20 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">Pending</h2>
              <h1 id="pending-count" class="capitalize font-extrabold text-2xl">69</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>

            <div class="h-full relative border container border-blue-400 bg-blue-400 bg-opacity-20 rounded-lg shadow-xl p-4">
              <div class="flex items-center gap-2">
                <i class="fa fas-truck"></i>
                <h2 class="font-bold text-xl">Shipping</h2>
              </div>
              <h1 id="shipping-count" class="capitalize font-extrabold text-2xl">69</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>

            <div class="h-full relative border container border-green-400 bg-green-400 bg-opacity-20 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">Completed</h2>
              <h1 id="completed-count" class="capitalize font-extrabold text-2xl">69</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>
          </div>
          <!-- Charts Container  -->
          <div class="h-full" id="charts-container"></div>
        </div>

        <!-- Right -->
        <div class="flex flex-col gap-4 relative">
          <div class="relative lg:h-64 lg:w-64 p-8 px-4 bg-secondary bg-opacity-5 border border-secondary rounded-lg">
            <div class=" flex flex-col items-start text-3xl">
              <h1 class="text-xl font-light">Customers</h1>
              <span id="customers-count" class="capitalize font-extrabold text-2xl">123</span>

              <!-- Image Greeting -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/2 aspect-square overflow-clip">
                <img src="/images/customs-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>

          <div class="h-full flex lg:flex-col justify-center items-center gap-4">
            <div class="relative lg:h-1/2 border container bg-base-100 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">Sales</h2>
              <h1 id="total-earned" class="capitalize font-extrabold text-2xl">$69123</h1>
              <p class="capitalize font-bold text-gray-400"><span id="orders-count">200-500</span> sales</p>
              <!-- Image Greeting -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/2 aspect-square overflow-clip">
                <img src="/images/sales-no-bg.png" alt="hello" />
              </div>
            </div>
            <div class="relative lg:h-1/2 border container bg-base-100 rounded-lg shadow-xl p-4">
              <h2 class="font-bold text-xl">Monthly Sales</h2>
              <h1 id="monthly-orders-earned" class="capitalize font-extrabold text-2xl">$42069</h1>
              <p class="capitalize font-bold text-gray-400"><span id="monthly-orders-count">200-500</span> sales</p>
              <!-- Image Greeting -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/2 aspect-square overflow-clip">
                <img src="/images/monthly-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    $(this.target).html(HTML);
  }
}
