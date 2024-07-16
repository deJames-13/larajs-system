const inputComponent = {
  id: "input-component",
  name: "input-component",
  type: "text",
  placeholder: "Enter value",
  class: "input input-bordered",
  appendClass: " "
};
export class InputComponent {
  constructor(props = {}) {
    Object.assign(this, inputComponent, props);
  }
  init() {
    this.render();
  }
  render() {
    return /* HTML */ ` <div class="flex flex-col space-y-2">
      <label for="${this.name}" class="text-lg font-semibold capitalize">${this.name}</label>
      <input type="${this.type}" name="${this.name}" id="${this.id}" class="${this.class} ${this.appendClass}" placeholder="${this.placeholder}" />
    </div>`;
  }
}
const textAreaComponent = {
  id: "textarea-component",
  name: "textarea-component",
  type: "textarea",
  placeholder: "Enter value",
  class: "input input-bordered",
  appendClass: " "
};
export class TextAreaComponent {
  constructor(props = {}) {
    Object.assign(this, textAreaComponent, props);
  }
  init() {
    this.render();
  }
  render() {
    return /* HTML */ ` <div class="flex flex-col space-y-2">
      <label for="${this.name}" class="text-lg font-semibold capitalize ">${this.name}</label>
      <textarea name="${this.name}" id="${this.id}" class="${this.class} ${this.appendClass}" placeholder="${this.placeholder}"></textarea>
    </div>`;
  }
}

const selectComponent = {
  id: "textarea-component",
  name: "textarea-component",
  type: "textarea",
  placeholder: "Enter value",
  class: "select select-bordered",
  appendClass: " ",
  options: [
    // {
    //   label: "Active",
    //   value: "active"
    // }
  ]
};

export class SelectComponent {
  constructor(props = {}) {
    Object.assign(this, selectComponent, props);
  }
  init() {
    this.render();
  }
  renderOptions() {
    if (!this.options.length > 0) return;
    return this.options.map(option => {
      return /* HTML */ `<option value="${option.value}">${option.label}</option>`;
    });
  }
  render() {
    return /* HTML */ ` <div class="flex flex-col space-y-2">
      <label for="${this.name}" class="text-lg font-semibold capitalize">${this.name}</label>
      <select name="${this.name}" id="${this.id}" class="${this.class} ${this.appendClass}">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>`;
  }
}
