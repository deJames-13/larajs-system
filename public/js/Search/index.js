import ajaxRequest from "../assets/ajaxRequest.js";
import { debounce } from "../assets/debounce.js";
import Pagination from "../components/Paginate.js";
import SearchItem from "../components/SearchItem.js";

export default class SearchPage {
  content = $("#search-contents");
  searchCount = $("#found-count");
  foundCount = $("#search-count");
  searchInput = $("#search-input-main");
  searchBtn = $("#search-button");
  paginations = $("#paginations");
  results = [];
  page = 1;
  maxPage = 1;

  constructor() {
    this.bindEvents();
    this.init();
    this.infiniteScroll();
  }

  handlePage(page) {
    this.page = page;
    this.fetchSearch();
  }

  infiniteScroll() {
    let debounceTimer;
    let isAutoScrolling = false;
    const container = $("#search-contents");
    container.animate({ scrollTop: 200 }, 500);
    container.scroll(() => {
      if (isAutoScrolling) return;
      const { scrollTop, scrollHeight, clientHeight } = container[0];
      // console.log({ scrollTop, scrollHeight, clientHeight });

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (this.page === 1 && scrollTop === 0) {
          container.animate({ scrollTop: 200 }, 500);
        }

        if (scrollTop + clientHeight === scrollHeight) {
          if (this.page < this.maxPage) {
            this.page += 1;
            this.fetchSearch();

            isAutoScrolling = true;
            container.animate({ scrollTop: 200 }, 500, () => {
              isAutoScrolling = false;
            });
          }
        }

        // Move up
        if (scrollTop === 0) {
          if (this.page > 1) {
            this.page -= 1;
            this.fetchSearch();

            isAutoScrolling = true;
            container.animate({ scrollTop: scrollHeight - clientHeight + 100 }, 500, () => {
              isAutoScrolling = false;
            });
          }
        }
      }, 300);
    });
  }

  paginate(response) {
    $("#paginations").empty();
    const { pagination, current_page, last_page } = response;
    if (pagination.next || pagination.prev || current_page > 1) {
      const links = new Pagination(pagination, current_page).render("#paginations");
      links.onClick(page => this.handlePage(page));
      this.maxPage = last_page;
    }
  }

  createResultItem(result, idx) {
    const searchItem = new SearchItem({
      index: idx + 1,
      parent: this.content,
      id: result.item.id,
      title: `${result.label}`,
      description: result.item.description,
      bottomLabel: `<span class="text-xs uppercase">FROM: ${result.type}</span>`,
      // image: item.image,
      link: result.link,
      onClick: () => {
        window.location.href = result.link;
      }
    });
    searchItem.render();
  }

  getResults(response) {
    // console.log(response);
    this.content.empty();

    this.paginate(response);
    const { found_count, total_count } = response;

    this.searchCount.text(found_count);
    this.foundCount.text(total_count);

    this.results = response.results;
    this.results.forEach((result, idx) => {
      this.createResultItem(result, idx);
    });
  }

  fetchSearch(term) {
    const payload = {
      term: term || this.searchInput.val()
    };

    ajaxRequest.post({
      url: "/api/search?page=" + this.page,
      data: payload,
      onSuccess: response => this.getResults(response),
      onError: response => {
        console.log(response);
      }
    });
  }

  onSearch(s) {
    if (s.length >= 3) {
      this.fetchSearch();
      // update url params q=s
      const url = new URL(window.location.href);
      url.searchParams.set("q", s);
      window.history.pushState({}, "", url);
    }
  }

  bindEvents() {
    const doSearch = debounce(() => {
      this.onSearch(this.searchInput.val());
    }, 500);

    this.searchInput.on("keyup", doSearch);

    this.searchBtn.on("click", () => {
      this.fetchSearch();
    });
  }

  init() {
    // if url has q parameter and value
    const urlParams = new URLSearchParams(window.location.search).get("q");
    if (urlParams) {
      this.searchInput.val(urlParams);
      this.fetchSearch();
    }
  }
}
