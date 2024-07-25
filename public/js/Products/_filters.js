export default class ProductFilters {
  constructor({ wrapper: wrapper }) {
    this.wrapper = $(wrapper);
    this.brands = [];
    this.categories = [];
    this.init();
  }
  init() {
    this.render();
  }

  createCategory(category) {
    const HTML = /* HTML */ `
      <button data-category-id="${category.id}" class="category-select flex items-center gap-2 text-xs">
        <span>${category.name}</span>
      </button>
    `;
    return HTML;
  }

  createBrand(brand) {
    const HTML = /* HTML */ `
      <label class="flex items-center gap-2 text-xs">
        <input type="checkbox" name="brand" data-brand-id="${brand.id}" value="${brand.id}" class="brand-checkbox checkbox checkbox-xs rounded-sm checkbox-secondary" />
        <span>${brand.name}</span>
      </label>
    `;
    return HTML;
  }

  filterBrands() {
    return /* HTML */ `
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg uppercase">Brands</h3>
        <i class="fas fa-angle-down"></i>
      </div>

      <div class="hover:border-primary search-brand border flex items-center group">
        <input id="brand-search" type="text" class=" input input-sm input-ghost focus:border-none focus:outline-none w-full p-2" placeholder="Search Brand" />
        <button class="btn btn-ghost rounded-none bg-gray-200">
          <i class="fas fa-magnifying-glass"></i>
        </button>
      </div>
      <div class="flex flex-col gap-1">${this.brands.map(brand => this.createBrand(brand)).join("")}</div>
    `;
  }

  filterCategories() {
    return /* HTML */ `
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg uppercase">Latest</h3>
        <i class="fas fa-angle-down"></i>
      </div>
      <div class="flex flex-col gap-1">${this.categories.map(category => this.createCategory(category)).join("")}</div>
    `;
  }

  priceFilter() {
    return /* HTML */ `
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-lg uppercase">Price</h3>
        <i class="fas fa-angle-down"></i>
      </div>

      <div class="range-slider" render>
        <input type="range" min="0" max="100" value="50" class="range range-sm" />
      </div>
    `;
  }

  render() {
    const HTML = /* HTML */ `
      <div class="flex flex-col gap-2 px-4">
        ${this.filterCategories()}

        <div class="divider m-0"></div>

        ${this.filterBrands()}

        <div class="divider m-0"></div>

        <button type="button" class="btn btn-primary text-white uppercase rounded-sm">Clear All Filters</button>

        <div class="divider m-0"></div>

        ${this.priceFilter()}
      </div>
    `;

    this.wrapper.html(HTML);
  }
}
