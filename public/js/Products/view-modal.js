import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-product",
  id: "view-product-modal",
  title: "View Product",
  destroyOnClose: true,
  isShown: true,
  width: "lg",
  isShowActions: false,
  data: {}
};
export default class ViewProduct extends FormModal {
  constructor(props = {}) {
    super(defaultProps);
    Object.assign(this, props);
  }
  makeContent() {
    return /*HTML*/ `
    <div>
        Content
    </div>
    `;
  }
}
