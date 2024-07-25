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
        this.metadata = data;
      }
    });
  }

  populate() {
    console.log(this.metadata);
    const status = this.metadata.status;
    Object.keys(status).forEach(key => {
      $(`#${key}`).text(status[key]);
    });
    const { earnings, annual, monthly } = this.metadata;
    Object.keys({ earnings, annual, monthly }).forEach(key => {
      const { total, count } = this.metadata[key];
      $(`[data-${key}] h1`).text(`₱ ${total.toFixed(2)}`);
      $(`[data-${key}] [name=count]`).text(count);
    });
    const { customers_count, products_count, orders_count } = this.metadata;
    $("#customers_count").text(customers_count);
    $("#products_count").text(products_count);
    $("#orders_count").text(orders_count);
  }

  render() {
    const HTML = /* HTML */ `
      <div class="h-full flex flex-col lg:flex-row gap-4 rounded-t-lg pb-12 xl:p-4">
        <!-- Left -->
        <div class="h-full flex flex-1 flex-col gap-4">
          <!-- Card -->
          <div class="relative h-64 p-8 px-4 bg-primary bg-opacity-20 border border-primary border-opacity-50 rounded-lg">
            <div class="flex flex-col items-start text-3xl">
              <h1 class="text-2xl  font-light">Welcome back!</h1>
              <span id="username" class="font-extrabold text-4xl z-[5]">${this.user.fullname || this.user.username}</span>
              <span id="username" class=" capitalize font-extrabold text-sm text-gray-500">@${this.user.fullname && this.user.username}</span>
            </div>
            <a href="/profile" class="mt-16 btn bg-primary bg-opacity-60 text-white uppercase border-none hover:bg-secondary">View Profile</a>

            <!-- Image -->
            <div class="hidden xl:block absolute bottom-0 right-0 z-[2] h-full max-w-sm overflow-clip">
              <img src="/images/man-greeting-no-bg.png" alt="hello" />
            </div>
          </div>

          <!-- Statuses -->
          <div class="flex items-center justify-between">
            <h1 class="font-extrabold uppercase text-xl">Orders</h1>
            <button class="btn btn-sm btn-outline btn-primary">View All</button>
          </div>

          <div class="divider m-0"></div>

          <div class="flex justify-center gap-4 mb-4">
            <div
              class="h-full max-h-32 relative border container border-yellow-400 bg-yellow-400 bg-opacity-20 rounded-lg shadow-xl p-4 hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-hourglass"></i>
                <h2 class="font-semibold text-lg uppercase">Pending</h2>
              </div>
              <h1 id="pending" name="status[]" class="capitalize font-extrabold text-2xl">0</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>

            <div
              class="h-full max-h-32 relative border container border-blue-400 bg-blue-400 bg-opacity-20 rounded-lg shadow-xl p-4 hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-truck"></i>
                <h2 class="font-semibold text-lg uppercase">Shipping</h2>
              </div>
              <h1 id="shipping" name="status[]" class="capitalize font-extrabold text-2xl">0</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>

            <div
              class="h-full max-h-32 relative border container border-green-400 bg-green-400 bg-opacity-20 rounded-lg shadow-xl p-4 hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <i class="fas fa-check-to-slot"></i>
                <h2 class="font-semibold text-lg uppercase">Completed</h2>
              </div>
              <h1 id="completed" name="status[]" class="capitalize font-extrabold text-2xl">0</h1>
              <!-- <p class="capitalize font-bold text-gray-400"><span id="">$200</span> Net Value</p>-->
            </div>
          </div>

          <!-- Charts Container  -->
          <div class="flex items-center justify-between">
            <h1 class="font-extrabold uppercase text-xl">Inventory</h1>
            <button class="btn btn-sm btn-outline btn-primary">View Products</button>
          </div>
          <div class="divider m-0"></div>
          <div class="h-full" id="charts-container"></div>
        </div>

        <!-- Right -->
        <div class="flex flex-col gap-4 relative">
          <div class="flex lg:flex-col justify-center items-center gap-2 p-4 border container bg-base-100 rounded-lg shadow-xl">
            <div class="w-full flex items-center justify-between">
              <h2 class="font-bold text-lg">Earnings</h2>
              <button class="btn btn-outline btn-sm btn-primary">View Chart</button>
            </div>
            <div class="divider m-0"></div>

            <!-- Total Earnings  -->
            <div data-earnings class="my-4 relative w-full">
              <div class="flex items-center justify-between">
                <h2 class="font-bold text-md text-gray-400 text-wrap">Total</h2>
              </div>
              <h1 name="total" class="capitalize font-extrabold text-2xl">₱0123</h1>
              <p class="capitalize font-bold text-gray-400"><span name="count">200-500</span> sales</p>

              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/sales-no-bg.png" alt="hello" />
              </div>
            </div>

            <!-- Annual Earnings  -->
            <div data-annual class="my-4 relative w-full">
              <div class="flex items-center justify-between">
                <h2 class="font-bold text-md text-gray-400 text-wrap">Annual</h2>
              </div>
              <h1 name="total" class="capitalize font-extrabold text-2xl">₱4200</h1>
              <p class="capitalize font-bold text-gray-400"><span name="count">200-500</span> sales</p>

              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/annual-no-bg.png" alt="hello" />
              </div>
            </div>

            <!-- Monthly Earnings  -->
            <div data-monthly class="my-4 relative w-full">
              <div class="flex items-center justify-between">
                <h2 class="font-bold text-md text-gray-400 text-wrap">Monthly</h2>
              </div>
              <h1 name="total" class="capitalize font-extrabold text-2xl">₱4200</h1>
              <p class="capitalize font-bold text-gray-400"><span name="count">200-500</span> sales</p>

              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/monthly-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>

          <!-- Transactions  -->
          <div
            onclick="window.location.href='/dashboard?nav=orders'"
            class="relative lg:h-32 lg:w-64 py-8 px-4 bg-secondary bg-opacity-5 border border-secondary rounded-lg hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
          >
            <div class=" flex flex-col items-start text-3xl">
              <h1 class="text-xl font-light">Transactions</h1>
              <span id="orders_count" class="capitalize font-extrabold text-2xl">123</span>

              <!-- Image -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/customs-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>
          <!-- Customer  -->
          <div
            onclick="window.location.href='/dashboard?nav=users'"
            class="relative lg:h-32 lg:w-64 py-8 px-4 bg-secondary bg-opacity-5 border border-secondary rounded-lg hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
          >
            <div class=" flex flex-col items-start text-3xl">
              <h1 class="text-xl font-light">Customers</h1>
              <span id="customers_count" class="capitalize font-extrabold text-2xl">123</span>

              <!-- Image -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/customs-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>
          <!-- Products  -->
          <div
            onclick="window.location.href='/dashboard?nav=products'"
            class="relative lg:h-32 lg:w-64 py-8 px-4 bg-secondary bg-opacity-5 border border-secondary rounded-lg hover:scale-110 hover:z-[12] transition-all ease-in-out cursor-pointer"
          >
            <div class="flex flex-col items-start text-3xl">
              <h1 class="text-xl font-light">Products</h1>
              <span id="products_count" class="capitalize font-extrabold text-2xl">123</span>

              <!-- Image -->
              <div class="hidden lg:block absolute bottom-0 right-0 w-1/3 aspect-square overflow-clip">
                <img src="/images/customs-no-bg.png" alt="hello" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    $(this.target).html(HTML);
  }
}
