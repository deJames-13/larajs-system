/* 
option = {
  label: "Option 1",
  value: "option-1"
}
*/
const defaultProps = {
  id: "",
  name: "selection",
  target: null,
  options: [
    {
      label: "Option 1",
      value: "option-1"
    },
    {
      label: "Option 2",
      value: "option-2"
    },
    {
      label: "Option 3",
      value: "option-3"
    }
  ],
  placeholder: "Select options: ",
  count: 5
};

export default class MultipleSelect {
  dropdown = null;
  component = null;
  tagsWrapper = null;

  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.selectedOptions = this.selectedOptions || [];
    this.init();
    return this;
  }
  init() {
    this.render();
    this.bindEvents();
  }
  getComponent() {
    return this.component;
  }

  bindEvents() {}

  addSelected(option) {
    if (!this.tagsWrapper) return;
    if (this.selectedOptions.includes(option)) return;

    this.selectedOptions.push(option);
    this.options = this.options.filter(opt => opt.value !== option.value);

    this.dropdown.find(`[data-option-value="${option.value}"]`).animate(
      {
        left: "5rem",
        opacity: 0
      },
      "300",
      function () {
        $(this).remove();
      }
    );

    this.tagsWrapper.append(this.makeTag(option));
  }
  removeSelected(option) {
    if (!this.tagsWrapper) return;
    if (this.options.includes(option)) return;

    this.options.push(option);
    this.selectedOptions = this.selectedOptions.filter(opt => opt.value !== option.value);

    this.tagsWrapper.find(`[data-tag-value="${option.value}"]`).animate(
      {
        right: "5rem",
        opacity: 0
      },
      "300",
      function () {
        $(this).remove();
      }
    );

    this.dropdown.append(this.makeOption(option));
  }

  filterOptions() {
    this.options = this.options.filter(option => {
      return !this.selectedOptions.some(selected => selected.value === option.value);
    });

    this.selectedOptions = this.selectedOptions.filter(option => {
      return !this.options.some(selected => selected.value === option.value);
    });
  }

  makeOption(option) {
    const HTML = /* HTML */ `
      <li data-option data-option-value="${option.value}">
        <button type="button" data-select-event class="option hover:border hover:border-b-2 border-primary capitalize duration-300" data-value="${option.value}">
          ${option.label}
        </button>
      </li>
    `;
    const el = $(HTML);
    el.find(".option")
      .off()
      .on("click", e => this.addSelected(option));
    el.animate({ opacity: 0, left: "-5rem" }, 0);
    el.animate({ opacity: 100, left: 0 }, 300);
    return el;
  }
  makeTag(option) {
    const HTML = /* HTML */ `
      <li data-tag data-tag-value="${option.value}">
        <div class="tag text-sm font-semibold p-1 px-2 rounded-sm bg-gray-300 capitalize hover:text-primary">
          <span>${option.label}</span>
          <button type="button" data-select-event class="remove-selected btn btn-xs btn-ghost">
            <i class="fas fa-times"></i>
          </button>
          <input type="hidden" name="${this.name}[]" value="${option.value}" id="${this.id}" />
        </div>
      </li>
    `;
    const el = $(HTML);
    el.find(".remove-selected")
      .off()
      .on("click", e => this.removeSelected(option));
    return el;
  }
  makeTags(selectedOptions) {
    if (!Array.isArray(selectedOptions)) return "";
    return this.selectedOptions.map(option => {
      return this.makeTag(option);
    });
  }

  makeOptions(options) {
    if (!Array.isArray(options)) return "";
    // limit the number of options to display
    options = options.slice(0, this.count);
    return options.map(option => {
      return this.makeOption(option);
    });
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  setSelection(selectedOptions) {
    this.selectedOptions = selectedOptions;
    return this;
  }

  update() {
    this.filterOptions();
    this.tagsWrapper.html(this.makeTags(this.selectedOptions));
    this.dropdown.html(this.makeOptions(this.options));
    return this;
  }

  render() {
    const HTML = /* HTML */ `
      <div class="dropdown dropdown-hover w-full">
        <div tabindex="0" role="button" class="w-full flex gap-2 p-2 px-4 border rounded-lg border-primary bg-transparent">
          <div className="flex items-center">
            <i class="fas fa-caret-down"></i>
            <span class="placeholder">${this.placeholder}</span>
          </div>
          <ul id="options-list" class="relative options flex flex-wrap gap-2"></ul>
        </div>
        <div class="dropdown-content my-2 mb-12 menu bg-base-100 rounded-lg z-[1] container max-w-sm p-2 shadow border gap-2">
          <div id="filter-options">
            <input type="text" class="input input-bordered rounded-md w-full" placeholder="Filter" />
          </div>
          <ul id="select-dropdown" tabindex="0"></ul>
        </div>
      </div>
    `;

    this.component = $(HTML);
    this.dropdown = $(this.component).find("#select-dropdown");
    this.tagsWrapper = $(this.component).find("#options-list");
    this.target && $(this.target).append(this.component);

    // filter options and selectedOptions so that they don't have the same values
    this.filterOptions();

    this.options.length && this.dropdown.html(this.makeOptions(this.options));
    this.selectedOptions.length && this.tagsWrapper.html(this.makeTags(this.selectedOptions));
  }
}
