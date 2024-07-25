import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-product",
  id: "view-product-modal",
  title: "View Product",
  destroyOnClose: true,
  isShown: true,
  width: "3xl",
  isShowActions: false,
  data: {}
};
export default class ViewProduct extends FormModal {
  constructor(props = {}) {
    super({ ...defaultProps, ...props });
  }

  makeContent() {
    console.log(this.data);
    const product = this.data;
    const image = (product.images.length && product.images[0].path) || "https://via.placeholder.com/150"; // Use a placeholder if no image is provided

    return /*HTML*/ `
      <div class="py-4 flex flex-col gap-8">
        <div class="flex p-4 gap-4 border shadow-xl rounded-lg">
          <div class="py-8 flex flex-col flex-grow pr-8 gap-1">
            <!-- Product ID -->
            <div class="flex justify-between gap-4 items-center">
              <label class="font-bold">Product #</label>
              <span>${product.id}</span>
            </div>

            <!-- Product Name -->
            <div class="flex justify-between gap-4 items-center">
              <label class="font-bold">Name:</label>
              <span>${product.name}</span>
            </div>

            <!-- SKU Code -->
            <div class="flex justify-between gap-4 items-center">
              <label class="font-bold">SKU Code:</label>
              <span>${product.sku_code}</span>
            </div>

            <!-- Price -->
            <div class="flex justify-between gap-4 items-center">
              <label class="font-bold">Price:</label>
              <span>${product.price}</span>
            </div>

            <!-- Status -->
            <div class="flex justify-between gap-4 items-center">
              <label class="font-bold">Status:</label>
              <span>${product.status}</span>
            </div>
          </div>
        </div>
        <div class="divider m-0"></div>
        <h3 class="text-xl font-bold m-0">Product Details</h3>
        <div class="flex gap-4 px-8 border p-4 rounded-lg">
          <div class="flex flex-col flex-grow gap-4">
            <!-- Description -->
            <div class="flex flex-col gap-2">
              <label class="font-bold">Description:</label>
              <span>${product.description || "No description available"}</span>
            </div>

            <!-- Specifications -->
            <div class="flex flex-col gap-2">
              <label class="font-bold">Specifications:</label>
              <span>${product.specifications || "No specifications available"}</span>
            </div>

            <!-- Created At -->
            <div class="flex flex-col gap-2">
              <label class="font-bold">Created At:</label>
              <span>${product.created_at || "No information available"}</span>
            </div>

            <!-- Updated At -->
            <div class="flex flex-col gap-2">
              <label class="font-bold">Updated At:</label>
              <span>${product.updated_at || "No information available"}</span>
            </div>

            </div>
          </div>
        </div>
      </div>
    `;
  }
}
