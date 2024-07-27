export class CartItem {
  constructor(product) {
    this.product = product;
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    $(document).ready(() => {
      $(`#item_qty_${this.product.id}`).on("change", this.updateTotalFromInput.bind(this));

      $(".cart-item")
        .off()
        .on("click", e => {
          $(e.currentTarget).toggleClass("cart-selected bg-secondary bg-opacity-10");
          $(e.currentTarget).find(".check-icon").toggle();
        });
    });
  }

  updateTotalFromInput() {
    let qty = $(`#item_qty_${this.product.id}`).val();
    let price = $("#price").text();
    let total = qty * price;
    $("#unit_total").text(total.toFixed(2));
  }

  render() {
    const image = this.product.images && this.product.images.length ? this.product.images[0].path : "https://placehold.co/400x600?text=item";

    return /* HTML */ `
      <!-- row item -->
      <tr
        data-id="${this.product.id}"
        id="cart_item_${this.product.id}"
        class="cart-item text-xs lg:text-md hover:scale-105 hover:z-[5] active:bg-secondary active:bg-opacity-20 active:scale-95 transition-all ease-in-out select-none cursor-pointer"
      >
        <!-- checked -->
        <td class="align-center">
          <div class="flex items-center justify-center">
            <i style="display: none" class="check-icon fas fa-check text-primary text-2xl animate__animated animate__bounceIn"></i>
          </div>
        </td>
        <!-- IMAGE -->
        <td>
          <div class="max-w-[90px] max-h-[120px]  rounded overflow-hidden">
            <img src="${image ?? "https://placehold.co/400x600?text=item"}" class="object-center w-full cursor-zoom-in" alt="product image" />
          </div>
        </td>

        <!-- PRODUCT -->
        <td class="align-center">
          <div class="max-w-[250px] flex items-center gap-3">
            <div>
              <a href="/products/${this.product.id}" class="font-bold link link-hover link-primary"> ${this.product.name ?? "Product Name"} </a>
              <div class=" opacity-50">SKU Code: <span id="sku_code">${this.product.sku_code ?? " XXX-000"}</span></div>
              <div class=" opacity-50">Brand: <span id="brand">${this.product.brand ?? "ABC"}</span></div>
            </div>
          </div>
        </td>

        <!-- UNIT PRICE -->
        <td class="align-center">
          <div class=" font-bold">PHP <span id="price">${this.product.price ?? "0"}</span></div>
        </td>
        <!-- QTY -->
        <td class="align-center">
          <input id="item_qty_${this.product.id}" type="number" min="1" value="${this.product.quantity ?? "0"}" min="1" class="item_qty input input-xs w-12 font-bold" />
        </td>
        <!-- TOTAL -->
        <td class="align-center">
          <div class=" font-bold">PHP <span id="unit_total">${(parseFloat(this.product.price ?? 0) * parseFloat(this.product.quantity ?? 0)).toFixed(2)}</span></div>
        </td>

        <!-- ACTION -->
        <th class="align-center">
          <button data-id="${this.product.id}" id="item_rm_${this.product.id}" class="item-rm-btn btn btn-ghost aspect-square text-red-400">
            <i class="fas fa-trash-alt"></i>
          </button>
        </th>
      </tr>
    `;
  }
}
