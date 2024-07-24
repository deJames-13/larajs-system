import FormPage from "../layouts/FormPage.js";
import BrandsCreate from "./create.js";
import BrandsEdit from "./edit.js";

export default class BrandsForm extends FormPage {
  constructor(props = {}) {
    super(props);
    this.init();
  }
  handleForm() {
    if (this.type === "edit") {
      $(document).ready(() => {
        new BrandsEdit();
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        new BrandsCreate({ target:this.target });
      });
    }
  }
  makeFields() {
    var html = super.makeFields();
    html += /* HTML */ `
      <div class="px-8 py-4 right info-container mb-24">
        <h3 class="text-2xl font-semibold border-b-2 border-opacity-25 border-primary">Brand Information</h3>
        <div class="flex flex-col space-y-4">
          <!-- Brand Name Input -->
          <div class="flex flex-col space-y-2">
            <label for="name" class="text-lg font-semibold">Brand Name</label>
            <input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter brand name" />
          </div>

          <!-- Brand Company Input -->
          <div class="flex flex-col space-y-2">
            <label for="company" class="text-lg font-semibold">Company</label>
            <input type="text" name="company" id="company" class="input input-bordered" placeholder="Enter brand company" />
          </div>

          <!-- Brand Website Input -->
          <div class="flex flex-col space-y-2">
            <label for="website" class="text-lg font-semibold">Website</label>
            <input type="text" name="website" id="website" class="input input-bordered" placeholder="Enter brand website" />
          </div>

          <!-- Brand Status Input -->
          <div class="flex flex-col space-y-2">
            <label for="status" class="text-lg font-semibold">Status</label>
            <select name="status" id="status" class="select select-bordered">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Brand Description Input -->
          <div class="flex flex-col space-y-2">
            <label for="description" class="text-lg font-semibold">Description</label>
            <textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter brand description" rows="4"></textarea>
          </div>
        </div>
      </div>
    `;
    return html;
  }
}
