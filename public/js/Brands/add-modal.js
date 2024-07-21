import FormModal from "../layouts/FormModal.js";
import BrandsCreate from "./create.js";
const defaultProps = {
  name: "add-brand",
  id: "add-brand-modal",
  title: "Add Brand",
  destroyOnClose: true,
  isShown: true,
  width: "lg"
};
export default class AddBrand extends FormModal {
  constructor() {
    super(defaultProps);
    return this;
  }
  handleForm() {
    $(document).ready(() => {
      new BrandsCreate({ target: "#" + this.id });
    });
    $("#" + this.id)
      .find("#back-button")
      .click(() => {
        this.close();
      });
  }
  makeContent() {
    return /* HTML */ `
      <div id="add-brand">
        <form id="item-form">
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
        </form>
      </div>
    `;
  }
}
