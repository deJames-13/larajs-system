import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-promo",
  id: "view-promo-modal",
  title: "View Product",
  destroyOnClose: true,
  isShown: true,
  width: "lg",
  isShowActions: false,
  data: {}
};
export default class ViewPromo extends FormModal {
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
