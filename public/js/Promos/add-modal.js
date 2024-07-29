import FormModal from "../layouts/FormModal.js";
import PromosCreate from "./create.js";
const defaultProps = {
  name: "add-promo",
  id: "add-promo-modal",
  title: "Add Promo",
  destroyOnClose: true,
  isShown: true,
  width: "lg"
};
export default class AddPromo extends FormModal {
  constructor() {
    super(defaultProps);
    return this;
  }
  handleForm() {
    $(document).ready(() => {
      new PromosCreate({ target: "#" + this.id });
    });
    $("#" + this.id)
      .find("#back-button")
      .click(() => {
        this.close();
      });
  }
  makeContent() {
    return /* HTML */ `
      <div id="add-promo">
        <form id="item-form">
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

            <!-- Promo Type Input -->
            <div class="flex flex-col space-y-2">
              <label for="type" class="text-lg font-semibold">Type</label>
              <select name="type" id="type" class="select select-bordered">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>

            <!-- Promo For Selection: Product - Order - Shipping -->
            <div class="flex flex-col space-y-2">
              <label for="promo_for" class="text-lg font-semibold">Type</label>
              <select name="promo_for" id="promo_for" class="select select-bordered">
                <option value="product">Product</option>
                <option value="order">Order</option>
                <option value="shipping">Shipping</option>
              </select>
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
        </form>
      </div>
    `;
  }
}
