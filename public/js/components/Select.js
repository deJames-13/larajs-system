import { debounce } from "../assets/debounce.js";
const defaultProps = {
  id: "",
  name: "",
  options: [],
  name: "select",
  placeholder: "Selected value: ",
  placeholderLabel: "Selected value: ",
  target: null,
  selected: {},
  count: 5,
  source: () => {
    return new Promise((resolve, reject) => {
      resolve([], []);
    });
  },
  onSelect: () => {}
};
export default class Select {
  dropdown = null;
  component = null;
  searchInput = null;
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  getComponent() {
    return this.component;
  }

  setOptions(options) {
    this.options = options;
    return this;
  }

  setSelected(selected) {
    this.selected = selected || {};
    return this;
  }

  makeSelected(selected) {
    if (selected.value === undefined) {
      // console.log("Selected value is undefined");
      this.selected = {};
      const selectedValue = this.component.find("#selected-value");
      selectedValue.attr("data-value", "");
      selectedValue.html("No value selected");
      return this;
    }

    this.options = [selected, ...this.options];
    this.selected = selected;
    const selectedValue = this.component.find("#selected-value");
    selectedValue.attr("data-value", selected.value);
    selectedValue.html(selected.label);
    const selectedInput = this.component.find("#selected-value-input");
    selectedInput.val(selected.value);
    return this;
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
      .on("click", e => {
        this.setSelected(option).update().onSelect(option);
      });
    el.animate({ opacity: 0, left: "-5rem" }, 0);
    el.animate({ opacity: 100, left: 0 }, 300);
    return el;
  }

  makeOptions(options) {
    if (!Array.isArray(options)) return "";
    // limit the number of options to display
    options = options.slice(0, this.count);
    return options.map(option => {
      return this.makeOption(option);
    });
  }

  update() {
    this.options = this.options.filter(option => option.value !== this.selected.value);
    this.options && this.dropdown.html(this.makeOptions(this.options));
    this.selected && this.makeSelected(this.selected);
    return this;
  }

  onSearch(value) {
    this._source({ search: value });
  }

  bindEvents() {
    $("#selected-value-input").val("0");
    const doSearch = debounce(() => {
      this.onSearch(this.searchInput.val());
    }, 500);

    // clear selected
    this.component.find("#remove-selected").on("click", () => {
      $("#selected-value-input").val("0");
      this.setSelected({}).update().onSelect({});
    });

    this.searchInput.on("keyup", doSearch);
  }

  _source(query = {}) {
    if (typeof this.source !== "function") return;
    $("#mini-loader-" + this.name).show();
    const res = this.source(query);
    res instanceof Promise &&
      res
        .then((options, selected) => {
          options && this.setOptions(options);
          selected && this.setSelected(selected);
          this.update();
        })
        .finally(() => {
          $("#mini-loader-" + this.name).hide();
        });
  }

  render() {
    const HTML = /* HTML */ `
      <div class="dropdown dropdown-hover w-full">
        <div tabindex="0" role="button" class="w-full flex gap-2 p-2 px-4 border rounded-lg border-primary bg-transparent">
          <div class="w-full flex items-center gap-2">
            <i class="fas fa-caret-down"></i>
            <span class="placeholder">${this.placeholder}</span>
            <span id="mini-loader-${this.name}" class="loading loading-spinner text-primary"></span>
            <span class="font-bold" id="selected-value" data-value="${this.selected.value ?? "0"}">${this.selected.label ?? this.placeholderLabel}</span>
            <input id="selected-value-input" type="hidden" name="${this.name}[]" id="${this.name}" />
            <button data-select-event type="button" id="remove-selected" class="ml-auto btn btn-sm btn-ghost">
              <i class="fas fa-multiply"></i>
              Clear
            </button>
          </div>
        </div>
        <div class="dropdown-content my-2 pb-12 menu bg-base-100 rounded-lg z-[1] container max-w-sm p-2 shadow border gap-2">
          <div id="filter-options">
            <input id="filter-input" type="text" class="input input-bordered rounded-md w-full" placeholder="Filter" />
          </div>
          <ul id="select-dropdown" tabindex="0" class="p-0"></ul>
        </div>
      </div>
    `;

    this.component = $(HTML);
    this.dropdown = $(this.component).find("#select-dropdown");
    this.searchInput = $(this.component).find("#filter-input");
    this.target && $(this.target).append(this.component);

    this._source();
  }
}
