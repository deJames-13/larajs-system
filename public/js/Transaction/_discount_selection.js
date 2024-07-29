import Select from "../components/Select.js";

export default class DiscountSelection extends Select {
  constructor(props = {}) {
    super(props);
    this.discounts = props.discounts;
    this.options = this.mapOptions(props.options);
    this.selected = props.selected;
    this.update();
    this.component.find("#mini-loader-" + this.name).remove();
    this.component.find("#filter-options").remove();
  }

  _source(query = {}) {
    this.setOptions(
      this.options.filter(option => {
        return option.name.toLowerCase().includes(query?.search?.toLowerCase() || "");
      })
    );
  }

  mapOptions(options) {
    return options.map(option => {
      return {
        value: option.id,
        label: /* HTML */ `
          ${option.name} -
          <span class="font-bold capitalized"> ${option.promo_type === "fixed" ? "PHP" : ""} ${option.discount} ${option.promo_type === "percentage" ? "%" : ""} off </span>
        `,
        ...option
      };
    });
  }

  makeOption(option) {
    const HTML = /* HTML */ `
      <li data-option data-option-value="${option.value}">
        <button
          type="button"
          data-select-event
          class="option rounded justify-start  hover:border hover:border-b-2 border-primary capitalize duration-300"
          data-value="${option.value}"
        >
          <span class="m-0 font-bold uppercase">${option.promo_for} Discount:</span>
          <span class="m-0 text-xs">
            ${option.name}:
            <span class="font-bold capitalized"> ${option.promo_type === "fixed" ? "PHP" : ""} ${option.discount} ${option.promo_type === "percentage" ? "%" : ""} off </span>
          </span>
        </button>
      </li>
    `;
    const el = $(HTML);
    el.find(".option")
      .off()
      .on("click", e => this.setSelected(option).update().onSelect(option));
    el.animate({ opacity: 0, left: "-5rem" }, 0);
    el.animate({ opacity: 100, left: 0 }, 300);
    return el;
  }
}
