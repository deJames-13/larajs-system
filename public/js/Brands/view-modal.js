import FormModal from "../layouts/FormModal.js";
const defaultProps = {
  name: "view-brand",
  id: "view-brand-modal",
  title: "View Brand",
  destroyOnClose: true,
  isShown: true,
  width: "lg",
  isShowActions: false,
  data: {}
};
export default class ViewBrand extends FormModal {
  constructor(props = {}) {
    super(defaultProps);
    Object.assign(this, props);
  }
  makeContent() {
    console.log(this.data); // make view based on this.data
    return /*HTML*/ `
    <div>
        Content
    </div>
    `;
  }
}
