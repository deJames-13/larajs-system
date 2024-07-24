import ajaxRequest from "../assets/ajaxRequest.js";
import Pagination from "../components/Paginate.js";
import ProductCard from "../components/ProductCard.js";

import { initInfiniteScroll, sortBy } from "./config.js";

export default class Products {
  constructor({ url, parent }) {
    this.products = [];
    this.url = url;
    this.parent = parent;
    this.sortBy = sortBy;
    let getParams = this.getUrlParams();
    this.queries = {
      page: 1,
      maxPage: 1,
      limit: 20,
      minLimit: 10,
      maxLimit: 50,
      sort: "updated_at",
      order: this.sortBy.order,
      ...getParams
    };
    this.fetchItems();
  }

  static init({ url, parent }) {
    const instance = new Products({
      url: url,
      parent: parent
    });

    initInfiniteScroll(instance);
    $("#scroll-down").hide();
    instance.render();

    return instance;
  }

  goToPage(page) {
    if (page < 1 || page > this.queries.maxPage) page = 1;
    this.queries.page = page;
    this.pushUrlParams({ key: "page", value: page });
    this.fetchItems();
  }

  handleSuccess(response) {
    // console.log(response);
    this.products = response.data;
    this.products.reverse();

    $(this.parent).empty();
    this.products.forEach(product => {
      const card = new ProductCard(product, "/products/" + product.id);
      $(this.parent).prepend(card.render());
    });

    if (response.links.next || response.prev || response.meta.current_page > 1) {
      const links = new Pagination(response.links, response.meta.current_page).render("#paginations");
      links.onClick(page => this.goToPage(page));
      this.queries.maxPage = response.meta.last_page;
      if (this.queries.page < 1 || this.queries.page > this.queries.maxPage) return this.goToPage(1);
    } else {
      $("#paginations").empty();
      $("#search-bar").hide();
    }

    $(".scroll-loader").hide();
  }

  fetchItems() {
    $(this.parent).empty();
    $("#paginations").empty();
    $(".scroll-loader").hide();

    let q = "";
    Object.keys(this.queries).forEach(key => {
      q += key + "=" + this.queries[key] + "&";
    });
    q.slice(0, -1);
    console.log(q);

    return ajaxRequest.get({
      url: this.url + "?" + q,
      onSuccess: response => {
        this.handleSuccess(response);
      },
      onError: error => {
        console.log(error);
        $(".scroll-loader").hide();
      }
    });
  }

  getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let queries = {};
    for (let [key, value] of urlParams) {
      queries[key] = value;
    }
    return queries;
  }

  pushUrlParams({ key, value }) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(key, value);
    window.history.pushState({}, "", "?" + urlParams.toString());
  }

  bindEvents() {
    let timeoutId = null;
    let delay = 500;
    $("#limit").on("input", e => {
      let value = e.target.value;
      value = Math.max(this.queries.minLimit, Math.min(this.queries.maxLimit, value));
      this.queries.limit = value;
      this.pushUrlParams({ key: "limit", value: value });
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        this.fetchItems();
      }, delay);
    });

    $("#sort-select select")
      .off()
      .on("change", e => {
        this.queries.sort = e.target.value;
        this.pushUrlParams({ key: "sort", value: e.target.value });
        this.fetchItems();
      });

    $("#order-btn")
      .off()
      .on("click", e => {
        const order = this.queries.order === "desc" ? "asc" : "desc";
        const btn = $(`[data-order=${this.queries.order}]`);
        btn.attr("data-order", order);
        btn.find(`[name=${this.queries.order}]`).hide();
        btn.find(`[name=${order}]`).show();
        this.queries.order = order;
        this.pushUrlParams({ key: "order", value: order });
        this.fetchItems();
      });
  }

  renderQueries() {
    const sort = /* HTML */ `
      <div id="sort-by" class="my-2 flex justify-end items-center gap-2">
        <label for="sort-by" class="text-sm">Sort by: </label>

        <div id="sort-select" class="flex items-center gap-1 border border-gray-300 rounded-full focus-within:outline-double focus-within:outline-gray-300">
          <!-- Order Button Toggler -->
          <button data-order="desc" type="button" id="order-btn" class="btn btn-sm btn-ghost aspect-square">
            <i name="desc" class="fas fa-arrow-down-wide-short"></i>
            <i style="display: none;" name="asc" class="fas fa-arrow-down-short-wide"></i>
          </button>

          <select class="w-fit input input-sm rounded-full focus:outline-none border-none">
            ${this.sortBy.filters
              .map(filter => {
                const isSelected = this.queries.sort === filter.value;
                return /* HTML */ ` <option value="${filter.value}" ${isSelected ? "selected" : ""}>${filter.label}</option> `;
              })
              .join("")}
          </select>
        </div>
      </div>
    `;

    const HTML = /* HTML */ `
      <div class="w-full flex flex-grow flex-wrap gap-2">
        <div class="w-full flex flex-wrap gap-2 items-center">
          <!-- View Limit -->
          <div id="limit-wrapper" class="text-sm">
            <span>View: </span>
            <input
              id="limit"
              type="number"
              min="${this.queries.minLimit}"
              value="${this.queries.limit}"
              max="${this.queries.maxLimit}"
              class="input input-bordered input-sm max-w-[69px] max-h-[35px]"
            />
          </div>
          <!-- Sort By -->
          ${this.sortBy.display ? sort : ""}
        </div>
      </div>
    `;

    return HTML;
  }

  render() {
    const queries = $(".queries");
    queries.empty();
    queries.append(this.renderQueries());
    this.bindEvents();
  }
}
