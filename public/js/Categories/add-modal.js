import Modal from "../components/Modal.js";
import CategoriesCreate from "./create.js";
const defaultProps = {
  name: "add-category",
  id: "add-category-modal",
  title: "Add Category",
  destroyOnClose: true,
  isShown: true,
  width: "lg"
};
export default class AddCategory extends Modal {
  constructor(props = {}) {
    super();
    Object.assign(this, defaultProps, props);
    this.modal && this.modal.remove();
    this.top = this.makeTop();
    this.content = this.makeContent();
    this.action = this.makeAction();
    this.init();
    this.handleForm();
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

  makeTop() {
    return /*HTML*/ `<h3 class="font-bold text-lg">${this.title}</h3>`;
  }
  makeContent() {
    return /*HTML*/ `
    <div id="add-category">
      <form id="item-form">
        <div class="right info-container">
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
      </form>
    </div>
    `;
  }
  makeAction() {
    return /*HTML*/ `
      <div class="flex justify-end space-x-2 actions">
        <button id="save-item" class="hidden btn btn-success">Save</button>
        <button id="cancel" class="hidden btn btn-error">Cancel</button>
        <button id="back-button" class="back btn btn-secondary">Back</button>
      </div>
    `;
  }
}
