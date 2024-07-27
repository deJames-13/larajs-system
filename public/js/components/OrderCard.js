export default class Order {
  constructor(order) {
    this.order = order;
    this.total = order.total;
    this.subtotal = order.subtotal;
    this.shipping_cost = order.shipping_cost;
    this.shipping_type = order.shipping_type;
  }

  renderItems(item) {
    // console.log(item);
    var unit_price = parseFloat(item.price) * parseFloat(item.order_quantity);
    const image = item.images && item.images.length ? item.images[0].path : "https://placehold.co/400x600?text=item";
    const brand = item.brands && item.brands.length ? item.brands[0].name : "N/A";
    return /* HTML */ `
      <div id="item__${this.order.id}__${item.id}" class="w-full container flex space-x-2 items-center">
        <div class="flex-grow flex items-start space-x-1">
          <!-- Image -->
          <div class="max-w-[90px] m-0 rounded">
            <img src="${image ?? "https://placehold.co/400x600?text=item"}" class="m-0 object-center w-full cursor-zoom-in" alt="product image" />
          </div>
          <!-- Product -->
          <div class="p-3 text-ellipsis flex items-center gap-3">
            <div>
              <a href="/products/${item.id}" class="font-bold link link-hover link-primary"> ${item.name} </a>

              <div class="font-bold">₱<span id="price__${this.order.id}__${item.id}">${item.price}</span></div>
              <div class="text-sm">
                <span class="opacity-50">Quantity:</span>
                <span id="quantity__${this.order.id}__${item.id}" class="font-semibold opacity-100">
                  <i class="fas fa-times text-xs"></i>
                  ${item.order_quantity}
                </span>
              </div>
              <div class="text-sm flex justify-between w-full">
                <span class="opacity-50">SKU Code:</span>
                <span id="sku_code__${this.order.id}__${item.id}">${item.sku_code}</span>
              </div>
              <div class="text-sm flex justify-between w-full">
                <span class="opacity-50">Brand:</span>
                <span id="brand__${this.order.id}__${item.id}" class="font-bold">${brand}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Unit Total -->
        <div class="flex items-center space-x-2">
          <div class="text-right text-sm">
            <div class="font-bold">₱<span id="unit_price__${this.order.id}__${item.id}">${unit_price.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return /* HTML */ `
      <!-- ORDER -->
      <div
        data-id="${this.order.id}"
        id="order-card__${this.order.id}"
        class="order-card hover:bg-gray-400 hover:bg-opacity-20 hover:shadow-xl hover:border-black transition-all ease-in prose container rounded border px-4 py-6"
      >
        <!-- Order Item Header -->
        <div class="cursor-pointer flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div>
            <h4 class="m-0 text-gray-500">
              Order #:
              <span id="order_id__${this.order.id}" class="link text-black hover:text-primary"> ${this.order.id} </span>
            </h4>
            <p class="m-0 link text-xs text-gray-600 italic hover:text-primary no-underline">
              Order Date:
              <span id="order_date__${this.order.id}"> ${this.order.created_at.replace("T", " ").split(".")[0]} </span>
            </p>
          </div>
          <div id="status__${this.order.id}" class="flex items-center justify-end space-x-2">
            <div class="text-xs flex  items-center  space-x-1">
              <span id="status-icon__${this.order.id}"> ${this.order.statusIcon} </span>
              <span id="status-message__${this.order.id}" class=" flex items-center"> ${this.order.statusMessage} </span>
            </div>
            <div class="divider divider-horizontal"></div>

            <span id="status__${this.order.id}" class="uppercase text-primary"> ${this.order.status} </span>
          </div>
        </div>
        <div class="m-0 divider"></div>

        <!-- Items List -->
        <div id="order-item-list__${this.order.id}" class="container flex flex-col space-y-2">
          ${this.order.products
            .map(it => {
              return this.renderItems(it);
            })
            .join("\n")}
        </div>

        <div class="m-0 divider"></div>

        <!-- TOTAL -->
        <div class="w-full flex items-center justify-end space-x-2">
          <div class="text-right w-1/4">
            <!--div class="text-sm flex justify-between w-full">
              <span class="opacity-50">Subtotal:</span>
              <span id="subtotal__${this.order.id}" class="font-semibold">₱${this.subtotal}</span>
            </~div -->
            <div class="text-sm flex justify-between w-full">
              <span class="opacity-50"></span>
              <span id="shipping_type__${this.order.id}" class="font-semibold capitalize">${this.shipping_type}</span>
            </div>
            <div class="text-sm flex justify-between w-full">
              <span class="opacity-50">Shipping Fee:</span>
              <span id="shipping_cost__${this.order.id}" class="font-semibold">₱${this.shipping_cost.toFixed(2)}</span>
            </div>
            <div class="divider m-0"></div>
            <div class="flex justify-between w-full">
              <span class="opacity-100">Total:</span>
              <span id="total__${this.order.id}" class="font-semibold">₱${this.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div class="my-4 flex items-center justify-end space-x-2">
          <!-- Actions -->
          <div data-id="${this.order.id}" id="order-actions__${this.order.id}" class="flex items-center space-x-2">
            <!-- for buttons manually add using jquery
                    <button class="btn btn-sm btn-primary ">Rate</button>
                    <button class="btn btn-sm btn-primary btn-outline">View Details</button>
                    <button class="btn btn-sm btn-primary btn-outline">Buy Again</button>
                -->
            ${this.order.actions}
          </div>
        </div>
      </div>
    `;
  }
}
