
export class CartItem {
    constructor(product) {
        this.product = product;
        this.attachEventHandlers();
    }



    attachEventHandlers() {
        $(document).ready(() => {
            $(`#item_qty_${this.product.id}`).on('change', this.updateTotalFromInput.bind(this));
        });
    }

    updateTotalFromInput() {
        let qty = $(`#item_qty_${this.product.id}`).val();
        let price = $('#price').text();
        let total = qty * price;
        $('#unit_total').text(total);
    }

    render() {
        return `
            <!-- row item -->
            <tr id="cart_item_${this.product.id}" class="text-xs lg:text-md">
                {{-- IMAGE --}}
                <td>
                    <div class="max-w-[90px] max-h-[120px]  rounded overflow-hidden">
                        <img 
                            src="${this.product.image ?? 'https://placehold.co/400x600?text=item'}" 
                            class="object-center w-full cursor-zoom-in"
                            alt="product image">
                    </div>
                </td>

                {{-- PRODUCT --}}
                <td class="align-center">
                    <div class="max-w-[250px] flex items-center gap-3">
                        <div>
                            <a href="/products/${this.product.id}" class="font-bold link link-hover link-primary">
                                ${this.product.name ?? 'Product Name'}
                            </a>
                            <div class=" opacity-50">
                                SKU Code: <span id="sku_code">${this.product.sku_code ?? ' XXX-000'}</span>
                            </div>
                            <div class=" opacity-50">
                                Brand: <span id="brand">${this.product.brand ?? 'ABC'}</span>
                            </div>
                        </div>
                    </div>
                </td>

                {{-- UNIT PRICE --}}
                <td class="align-center">
                    <div class=" font-bold">
                        PHP <span id="price">${this.product.price ?? '0'}</span>
                    </div>
                </td>
                {{-- QTY --}}
                <td class="align-center">
                    <input id="item_qty_${this.product.id}" type="number" value="${this.product.quantity ?? '0'}" min=1 class="item_qty input input-xs w-12 font-bold">
                </td>
                {{-- TOTAL --}}
                <td class="align-center">
                    <div class=" font-bold">
                        PHP <span id="unit_total">${parseFloat(this.product.price) * parseFloat(this.product.quantity) ?? '0'}</span>
                    </div>
                </td>

                {{-- ACTION --}}
                <th class="align-center">
                    <button data-id="${this.product.id}" id="item_rm_${this.product.id}" class="item-rm-btn btn btn-ghost aspect-square text-red-400">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </th>
            </tr>
        `;
    }


}