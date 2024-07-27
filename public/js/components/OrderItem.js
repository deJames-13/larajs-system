export default class OrderItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const image = this.product.images && this.product.images.length ? this.product.images[0].path : "https://placehold.co/400x600?text=item";
    const unit_total = parseFloat(this.product?.price || 0) * parseFloat(this.product?.quantity || 0);
    return /* HTML */ `
      <!-- row item -->
      <tr id="cart_item_${this.product.id}">
        <!-- IMAGE -->
        <th class="print:hidden">
          <div class="max-w-[90px] max-h-[120px]  rounded overflow-hidden">
            <img src="${this.product.image ?? "https://placehold.co/400x600?text=item"}" class="object-center w-full cursor-zoom-in" alt="product image" />
          </div>
        </th>

        <!-- PRODUCT -->
        <td class="align-center">
          <div class="max-w-[250px] flex items-center gap-3">
            <div>
              <a href="/products/${this.product.id}" class="font-bold link link-hover link-primary"> ${this.product.name ?? "Product Name"} </a>
              <div class="text-sm opacity-50">SKU Code: <span id="sku_code">${this.product.sku_code ?? " XXX-000"}</span></div>
              <div class="text-sm opacity-50">Brand: <span id="brand">${this.product.brand ?? "ABC"}</span></div>
            </div>
          </div>
        </td>

        <!-- UNIT PRICE -->
        <td class="align-center">
          <div class="text-sm font-bold">PHP <span id="price">${this.product.price ?? "0"}</span></div>
        </td>
        <!-- QTY -->
        <td class="align-center">
          <p id="item_qty_${this.product.id}">${this.product.quantity ?? "0"}</p>
        </td>
        <!-- TOTAL -->
        <td class="align-center">
          <div class="text-sm font-bold">PHP <span id="unit_total">${unit_total?.toFixed(2) ?? "0"}</span></div>
        </td>
      </tr>
    `;
  }
}
