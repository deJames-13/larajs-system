import Modal from "../components/Modal.js";
const defaultProps = {
  name: "",
  id: "modal",
  title: "",
  destroyOnClose: false,
  isShown: true,
  onEscClose: true,
  width: "lg"
};
export default class FormModal extends Modal {
  constructor(props = {}) {
    this.init();
    super();
    Object.assign(this, defaultProps, props);

    return this;
  }
  init() {
    this.top = this.makeTop();
    this.content = this.makeContent();
    this.action = this.makeAction();
  }
  makeTop() {
    return /*HTML*/ `<h3 class="font-bold text-lg">${this.title}</h3>`;
  }
  makeContent() {
    return /*HTML*/ ``;
  }
  makeAction() {
    return /*HTML*/ ``;
  }
}
