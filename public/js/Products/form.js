import MultipleSelect from "../components/MultipleSelect.js";
import FormPage from "../layouts/FormPage.js";
import ProductsCreate from "./create.js";
import ProductsEdit from "./edit.js";

export default class ProductsForm extends FormPage {
  constructor(props = {}) {
    super(props);
    this.init();
  }

  init() {
    super.init();

    new MultipleSelect({
      target: "#categories-select"
    })
      .getComponent()
      .prop("outerHTML");
  }

  handleForm() {
    if (this.type === "edit") {
      $(document).ready(() => {
        new ProductsEdit();
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        new ProductsCreate();
      });
    }
  }
  makeFields() {
    var html = super.makeFields();
    html += /* HTML */ `
      <div class="right info-container py-4 px-8 mb-24">
        <h3 class="text-2xl font-semibold border-b-2 border-primary border-opacity-25">Product Information</h3>
        <div class="flex flex-col space-y-4 ">
          <!-- Item Name Input -->
          <div class="flex flex-col space-y-2">
            <label for="name" class="text-lg font-semibold">Item Name</label>
            <input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter item name" />
          </div>

          <!-- Item Price Input -->
          <div class="flex flex-col space-y-2">
            <label for="price" class="text-lg font-semibold">Price</label>
            <input type="number" name="price" id="price" class="input input-bordered" placeholder="Enter item price" />
          </div>
          <!-- Item Stock Input -->
          <div class="flex flex-col space-y-2">
            <label for="stock" class="text-lg font-semibold">Stock</label>
            <input type="number" name="stock" id="stock" class="input input-bordered" placeholder="Enter item stock" />
          </div>

          <!-- Item SKU Code Input -->
          <div class="flex flex-col space-y-2">
            <label for="sku_code" class="text-lg font-semibold">SKU Code</label>
            <input type="text" name="sku_code" id="sku_code" class="input input-bordered" placeholder="Enter stock keeping unit code" />
          </div>

          <!-- Item Description Input -->
          <div class="flex flex-col space-y-2">
            <label for="description" class="text-lg font-semibold">Description</label>
            <textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter item description" rows="4"></textarea>
          </div>
          <!-- Item Specifications Input -->
          <div class="flex flex-col space-y-2">
            <label for="specifications" class="text-lg font-semibold">Specifications</label>
            <textarea name="specifications" id="specifications" class="textarea textarea-bordered" placeholder="Enter item specifications" rows="4"></textarea>
          </div>

          <!-- Item Status Input -->
          <div class="flex flex-col space-y-2">
            <label for="status" class="text-lg font-semibold">Status</label>
            <select name="status" id="status" class="select select-bordered">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Item Brand Select -->
          <div class="flex gap-4 items-end">
            <div class="flex flex-grow flex-col space-y-2">
              <label for="brand_id" class="text-lg font-semibold">Brand</label>
              <select name="brand_id" id="brand_id" class="select select-bordered">
                <option value="">Select a brand</option>
              </select>
            </div>
            <button class="btn btn-outline btn-primary">
              <i class="fas fa-plus"></i>
              <span> Add Brand </span>
            </button>
          </div>
          <!-- Item Categories // Multi select component -->
          <!-- Item Brand Select -->
          <div class="flex gap-4 items-end">
            <div class="flex flex-grow flex-col space-y-2">
              <label for="categories" class="text-lg font-semibold">Categories</label>
              <div id="categories-select"></div>
            </div>
            <button class="btn btn-outline btn-primary">
              <i class="fas fa-plus"></i>
              <span> Add Category </span>
            </button>
          </div>
        </div>
      </div>
    `;

    return html;
  }
}
