import FormPage from "../layouts/FormPage.js";
import PromosCreate from "./create.js";
import PromosEdit from "./edit.js";

export default class PromosForm extends FormPage {
  constructor(props = {}) {
    super(props);
    this.init();
  }

  handleForm() {
    if (this.type === "edit") {
      $(document).ready(() => {
        new PromosEdit();
      });
    } else if (this.type === "create") {
      $(document).ready(() => {
        new PromosCreate();
      });
    }
  }
  makeFields() {
    var html = super.makeFields();
    html += /* HTML */ `
      <div class="right info-container py-4 px-8 mb-24">
        <h3 class="text-2xl font-semibold border-b-2 border-primary border-opacity-25">Promo Information</h3>
        <div class="flex flex-col space-y-4">
          <!-- Promo Name Input -->
          <div class="flex flex-col space-y-2">
            <label for="name" class="text-lg font-semibold">Promo Name</label>
            <input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter promo name" />
          </div>

          <!-- Promo Slug Input -->
          <div class="flex flex-col space-y-2">
            <label for="slug" class="text-lg font-semibold">Slug</label>
            <textarea name="slug" id="slug" class="textarea textarea-bordered" placeholder="Enter promo slug" rows="2"></textarea>
          </div>

          <!-- Promo Discount Input -->
          <div class="flex flex-col space-y-2">
            <label for="discount" class="text-lg font-semibold">Discount</label>
            <input type="number" name="discount" id="discount" class="input input-bordered" placeholder="Enter promo discount" />
          </div>

          <!-- Promo Start Date Input -->
          <div class="flex flex-col space-y-2">
            <label for="start_date" class="text-lg font-semibold">Start Date</label>
            <input type="date" name="start_date" id="start_date" class="input input-bordered" placeholder="Enter promo start date" />
          </div>

          <!-- Promo End Date Input -->
          <div class="flex flex-col space-y-2">
            <label for="end_date" class="text-lg font-semibold">End Date</label>
            <input type="date" name="end_date" id="end_date" class="input input-bordered" placeholder="Enter promo end date" />
          </div>

          <!-- Promo Status Input -->
          <div class="flex flex-col space-y-2">
            <label for="status" class="text-lg font-semibold">Status</label>
            <select name="status" id="status" class="select select-bordered">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Promo Description Input -->
          <div class="flex flex-col space-y-2">
            <label for="description" class="text-lg font-semibold">Description</label>
            <textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter promo description" rows="4"></textarea>
          </div>
        </div>
      </div>
    `;
    return html;
  }
}
