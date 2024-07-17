import FormPage from "../layouts/FormPage.js";
import CategoriesCreate from "./create.js";
import CategoriesEdit from "./edit.js";

export default class CategoriesForm extends FormPage {
  constructor(props = {}) {
    super(props);
    this.init();
  }

  handleForm() {
    if (this.type === "edit") {
      $(document).ready(() => {
        new CategoriesEdit();
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        new CategoriesCreate({ target: this.target });
      });
    }
  }

  makeFields() {
    var html = super.makeFields();
    html += /* HTML */ `
      <div class="px-8 py-4 right info-container mb-24">
        <h3 class="text-2xl font-semibold">Category Information</h3>
        <div class="divider m-0"></div>
        <div class="flex flex-col space-y-4">
          <!-- Category Name Input -->
          <div class="flex flex-col space-y-2">
            <label for="name" class="text-lg font-semibold">Category Name</label>
            <input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter category name" />
          </div>

          <!-- Category Slug Input -->
          <div class="flex flex-col space-y-2">
            <label for="slug" class="text-lg font-semibold">Slug</label>
            <input type="text" name="slug" id="slug" class="input input-bordered" placeholder="Enter category slug" />
          </div>

          <!-- Category Status Input -->
          <div class="flex flex-col space-y-2">
            <label for="status" class="text-lg font-semibold">Status</label>
            <select name="status" id="status" class="select select-bordered">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Category Description Input -->
          <div class="flex flex-col space-y-2">
            <label for="description" class="text-lg font-semibold">Description</label>
            <textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter category description" rows="4"></textarea>
          </div>
        </div>
      </div>
    `;
    return html;
  }
}
