import AddCategory from "../Categories/add-modal.js";
import MultipleSelect from "../components/MultipleSelect.js";
import FormPage from "../layouts/FormPage.js";
import ProductsCreate from "./create.js";
import ProductsEdit from "./edit.js";
export default class ProductsForm extends FormPage {
  formInstance = null;
  msCategories = null;
  categories = {
    data: [],
    selected: [],
    options: []
  };

  constructor(props = {}) {
    super(props);
    this.init();
  }

  init() {
    super.init();
  }

  async fetchCategories({ query = {} }) {
    const q = {
      limit: 100,
      ...query
    };
    $("#mini-loader").show();
    return this.fetch("categories", q).then(({ data }) => {
      $("#mini-loader").hide();
      this.categories.data = data;
      this.categories.options = this.mapOptions(data);
    });
  }

  mapOptions(options) {
    return options.map(option => {
      return { value: option.id, label: option.name };
    });
  }

  multiSelectSource(query = {}) {
    return new Promise((resolve, reject) => {
      this.fetchCategories({ query }).then(() => {
        resolve(this.categories.options, this.categories.selected);
      });
    });
  }

  setMultiSelect() {
    this.msCategories = new MultipleSelect({
      name: "categories",
      target: $("#categories-select"),
      source: this.multiSelectSource.bind(this)
    });
  }

  handleForm() {
    this.setMultiSelect();
    if (this.type === "edit") {
      $(document).ready(() => {
        this.formInstance = new ProductsEdit().then(({ data }) => {
          this.categories.selected = this.mapOptions(data.categories);
          this.msCategories && this.msCategories.setSelection(this.categories.selected).update();
        });
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        this.formInstance = new ProductsCreate();
      });
    }
  }

  bindEvents() {
    super.bindEvents();
    $("#add-category").on("click", () => {
      new AddCategory();
    });

    $(document).on("click", "[data-select-event]", e => {
      $("#save-item, #cancel").show();
    });
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
            <button type="button" class="btn btn-outline btn-primary">
              <i class="fas fa-plus"></i>
              <span> Add Brand </span>
            </button>
          </div>
          <!-- Item Categories // Multi select component -->
          <div class="flex gap-4 items-end m-1">
            <div class="flex flex-grow flex-col space-y-2">
              <div class="flex items-center">
                <label for="categories" class="text-lg font-semibold">Categories</label>
              </div>
              <div id="categories-select"></div>
            </div>
            <button type="button" id="add-category" class="btn btn-outline btn-primary">
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
