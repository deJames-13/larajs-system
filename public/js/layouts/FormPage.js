import ajaxRequest from "../assets/ajaxRequest.js";
const defaultProps = {
  id: null,
  target: null,
  name: "page",
  type: "form",
  form: null,
  exitPage: () => {}
};
export default class FormPage {
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    return this;
  }
  init() {
    this.render();
    this.form && this.form.html(this.makeFields());
    this.bindEvents();
    this.handleForm();
  }
  handleForm() {}
  bindEvents() {
    $("#back-button")
      .off()
      .on("click", () => {
        this.exitPage();
      });
  }
  async fetch(path, query = {}) {
    let qString = "?";
    Object.keys(query).forEach(key => {
      qString += key + "=" + query[key] + "&";
    });
    qString = qString.slice(0, -1);
    return new Promise((resolve, reject) => {
      ajaxRequest.get({
        url: "/api/" + path + qString,
        onSuccess: response => resolve(response.data),
        onError: error => reject(error)
      });
    });
  }

  makeFields() {
    if (!this.form) return;
    return /* HTML */ `
      <div id="image-container" class="flex flex-col space-y-2 border-opacity-25 left image-container border-secondary ">
        <div>
          <div class="relative ">
            <button type="button" class="z-[100] top-1/2  absolute prev m-4 hover:scale-110 transition-all hover:text-primary">
              <i className="fas fa-arrow-angle-left"></i>
            </button>
            <button type="button" class="z-[100] top-1/2 right-0  absolute next m-4 hover:scale-110 transition-all hover:text-primary">
              <i className="fas fa-arrow-angle-right"></i>
            </button>
            <div class="flex-grow item-carousel hover h-[300px] max-h-[300px] flex items-center justify-center overflow-hidden">
              <img src="https://placehold.co/300x200?text=img" alt="Placeholder" class="cursor-zoom-in max-h-[300px] object-contain" />
            </div>
          </div>
        </div>
        <div class="flex justify-center p-4 space-x-2">
          <input id="image-input" type="file" multiple accept="image/*" class="max-w-[300px] flex-grow file-input file-input-bordered file-input-primary" name="images[]" />
        </div>
      </div>
    `;
  }

  render() {
    if (!this.id && this.type === "edit") return;
    const HTML = /* HTML */ `
      <div class="page container mx-auto px-6 py-12">
        <div class="flex flex-col space-y-4">
          <div class="flex items-center justify-between top">
            <h1 class="text-3xl font-extrabold capitalize">${this.type} ${this.name}</h1>
            <div class="flex justify-end space-x-2 actions">
              <button id="save-item" class="hidden btn btn-success">Save</button>
              <button id="cancel" class="hidden btn btn-error">Cancel</button>
              <button id="back-button" class="back btn btn-secondary">Back</button>
            </div>
          </div>
          <div class="divider"></div>

          <form
            data-id="${this.id}"
            id="item-form"
            enctype="multipart/form-data"
            class="container grid grid-cols-1 gap-4 border border-opacity-25 rounded-md shadow-md lg:grid-cols-1 border-secondary"
          ></form>
        </div>
      </div>
    `;
    const page = $(this.target);
    page.html(HTML);
    this.form = page.find("#item-form");
  }
}
