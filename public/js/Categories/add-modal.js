import FormModal from "../layouts/FormModal.js";
import CategoriesCreate from "./create.js";
const defaultProps = {
  name: "add-category",
  id: "add-category-modal",
  title: "Add Category",
  destroyOnClose: true,
  isShown: true,
  width: "lg"
};
export default class AddCategory extends FormModal {
  constructor() {
    super(defaultProps);
    return this;
  }

  handleForm() {
    $(document).ready(() => {
      new CategoriesCreate({ target: "#" + this.id });
    });
    $("#" + this.id)
      .find("#back-button")
      .click(() => {
        this.close();
      });
  }
  makeContent() {
    return /*HTML*/ `
    <div id="add-category">
      <form id="item-form">
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
      </form>
    </div>
    `;
  }
}
