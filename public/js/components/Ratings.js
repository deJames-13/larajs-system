const defaultProps = {
  target: "",
  ratings: {}
};

export default class Ratings {
  component = null;
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.init();
  }
  init() {
    this.render();
  }
  renderTabs(tabs) {
    const tab = $(/* HTML */ ` <button data-ratings="all" type="button" class="btn btn-outline btn-primary border-opacity-40 rounded-none btn-sm bg-base-100">All</button> `);
  }
  makeStars(ratings) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const star = /* HTML */ ` <i class="fas fa-star ${i <= parseInt(ratings.average) ? "text-primary" : ""}"></i> `;
      stars.push(star);
    }
    return stars.join("");
  }

  render() {
    const HTML = /* HTML */ `
      <div id="product-ratings" class="container shadow-2xl p-4 rounded bg-base-100 border border-opacity-20">
        <h1 class="text-xl font-semibold uppercase">Product Ratings</h1>
        <div class="h-full my-4 rounded flex gap-8 items-start py-4 px-8 border border-primary border-opacity-40 bg-secondary bg-opacity-20">
          <div class="flex flex-col gap-4">
            <div class="text-primary text-xl">
              <span id="product-rating" class="text-3xl font-bold"> ${this.ratings.average ?? 0} </span>
              <span> out of 5 </span>
            </div>
            <div class="ratings-wrapper flex items-center text-2xl text-secondary">${this.makeStars(this.ratings)}</div>
          </div>
          <div id="ratings-tab-button" class="flex flex-grow flex-wrap gap-4 h-full"></div>
        </div>
      </div>
    `;
    this.component = $(HTML);
    this.target && $(this.target).append(this.component);
  }
}
