import AddCategory from "../Categories/add-modal.js";
import MultipleSelect from "../components/MultipleSelect.js";
import FormPage from "../layouts/FormPage.js";
import ProductsCreate from "./create.js";
import ProductsEdit from "./edit.js";
export default class ProductsForm extends FormPage {
  msCategories = null;

  categories = {
    data: [],
    selected: [],
    options: []
  };
  brands = {
    data: [],
    selected: [],
    options: []
  };
  formInstance = null;

  constructor(props = {}) {
    super(props);
    this.init();
  }

  init() {
    super.init();
  }

  async getCategories() {
    const query = {
      limit: 100
    };
    $("#mini-loader").show();
    return this.fetch("categories", query).then(categories => {
      $("#mini-loader").hide();

      this.categories.data = categories;
      this.categories.options = categories.map(category => {
        return {
          value: category.id,
          label: category.name
        };
      });
      this.msCategories && this.msCategories.setOptions(this.categories.options).update();
    });
  }

  async getBrands() {
    const query = {
      limit: 100
    };
    return this.fetch("brands", query).then(brands => {
      this.brands.data = brands;
      this.brands.options = brands.map(brand => {
        return {
          value: brand.id,
          label: brand.name
        };
      });
    });
  }

  selectCetegories(item) {
    if (!item.categories) return;
    this.categories.selected = item.categories.map(category => {
      return {
        value: category.id,
        label: category.name
      };
    });

    this.msCategories = new MultipleSelect({
      target: $("#categories-select"),
      id: "categories",
      name: "categories",
      options: this.categories.options,
      selectedOptions: this.categories.selected,
      placeholder: "Select categories: "
    });
    this.getCategories();
    this.getBrands();
  }

  handleForm() {
    if (this.type === "edit") {
      $(document).ready(() => {
        this.formInstance = new ProductsEdit({
          onReady: item => this.selectCetegories(item)
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
                <span id="mini-loader" class="loading loading-spinner text-primary"></span>
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
