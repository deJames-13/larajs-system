import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-category",
  id: "view-category-modal",
  title: "View Category",
  destroyOnClose: true,
  isShown: true,
  width: "lg",
  isShowActions: false,
  data: {}
};
export default class ViewCategory extends FormModal {
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
