import ajaxRequest from "../assets/ajaxRequest.js";

const defaultProps = {
  productId: null,
  ratings: null,
  average: "",
  highest: "",
  lowest: "",
  target: "",
  count: 0,
  tabs: 0
};

export default class Ratings {
  component = null;
  constructor(props = {}) {
    Object.assign(this, defaultProps, props);
    this.fetchRatings().then(response => {
      Object.assign(this, response);
      console.log(this);
      this.init();
    });
  }

  fetchRatings() {
    return ajaxRequest.get({
      url: `/api/ratings/${this.productId}`
    });
  }

  init() {
    this.render();
  }
  renderTabs(tabs) {
    const el = $("#ratings-tab-button");
    tabs.reverse();
    tabs.forEach(t => {
      const button = $(/* HTML */ `
        <button data-ratings="${t.label.toLowerCase().replace(" ", "_")}" type="button" class="btn btn-outline btn-primary border-opacity-40 rounded-none btn-sm bg-base-100">
          ${t.label} (${t.value})
        </button>
      `);
      button.click(() => {
        console.log(t);
      });
      el.append(button);
    });
  }
  makeStars(average) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const star = /* HTML */ ` <i class="fas fa-star ${i < Math.round(average) ? "text-primary" : ""}"></i> `;
      stars.push(star);
    }
    return stars.join("");
  }

  makeCard(rating) {
    return /* HTML */ `
      <div class="flex gap-4">
        <div class="w-10 ">
          <img src="${rating.user_image}" class="aspect-square rounded-full" />
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-primary" name="username">
            <strong>${rating.username}</strong>
          </span>
          <span class="font-light" name="username"> ${rating.rating} out of 5 </span>
          <div class="ratings-wrapper flex items-center text-2xl text-secondary">${this.makeStars(rating.rating)}</div>
          <span class="text-base">${rating.review}</span>
        </div>
      </div>
      <div class="divider m-0"></div>
    `;
  }
  makeCards(ratings) {
    const el = $("#user-ratings");
    ratings.forEach(rating => {
      const card = $(this.makeCard(rating));
      el.append(card);
    });
  }

  render() {
    const HTML = /* HTML */ `
      <div id="product-ratings" class="container shadow-2xl p-4 rounded bg-base-100 border border-opacity-20">
        <h1 class="text-xl font-semibold uppercase">Product Ratings</h1>
        <div class="h-full my-4 rounded flex gap-8 items-start py-4 px-8 border border-primary border-opacity-40 bg-secondary bg-opacity-20">
          <div class="flex flex-col gap-4">
            <div class="text-primary text-xl">
              <span id="product-rating" class="text-3xl font-bold"> ${parseFloat(this.average).toFixed(2) ?? 0} </span>
              <span> out of 5 </span>
            </div>
            <div class="ratings-wrapper flex items-center text-2xl text-secondary">${this.makeStars(this.average)}</div>
          </div>
          <div id="ratings-tab-button" class="flex flex-grow flex-wrap gap-4 h-full"></div>
        </div>

        <div id="user-ratings" class="p-8"></div>
      </div>
    `;
    this.component = $(HTML);
    this.target && $(this.target).append(this.component);
    this.renderTabs(this.tabs);
    this.makeCards(this.ratings.data);
  }
}
