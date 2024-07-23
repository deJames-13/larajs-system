import Modal from "../components/Modal.js";
const defaultProps = {
  name: "form-modal",
  id: "form-modal",
  title: "Form Modal",
  destroyOnClose: true,
  isShown: true,
  width: "lg",
  isShowActions: true
};
export default class FormModal extends Modal {
  constructor(props = {}) {
    super({ ...defaultProps, ...props });
    Object.assign(this, defaultProps, props);
    this.modal && this.modal.remove();
    this.top = this.makeTop();
    this.content = this.makeContent();
    this.action = this.makeAction();
    this.init();
    this.handleForm();
    return this;
  }
  handleForm() {}
  makeTop() {
    return /*HTML*/ `<h3 class="font-bold text-lg">${this.title}</h3>`;
  }
  makeContent() {
    return /*HTML*/ `<div>content here</div>`;
  }
  makeAction() {
    return /*HTML*/ this.isShowActions
      ? `
      <div class="flex justify-end space-x-2 actions">
        <button id="save-item" class="hidden btn btn-success">Save</button>
        <button id="cancel" class="hidden btn btn-error">Cancel</button>
        <button id="back-button" class="btn btn-secondary">Back</button>
      </div>
    `
      : "";
  }
}
