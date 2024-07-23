import ajaxRequest from "../assets/ajaxRequest.js";
import Pagination from "../components/Paginate.js";
import ProductCard from "../components/ProductCard.js";

export default class Products {
  constructor({ url, parent }) {
    this.products = [];
    this.url = url;
    this.parent = parent;
    this.page = 1;
    this.maxPage = 1;

    this.fetchItems();
    this.initInfiniteScroll();
    $("#scroll-down").hide();
  }

  handlePage(page) {
    this.page = page;
    this.fetchItems(this.page);
  }

  initInfiniteScroll() {
    let debounceTimer;
    let isAutoScrolling = false;
    $(window).scroll(() => {
      if (isAutoScrolling) return;

      if (this.page === this.maxPage) {
        $("#scroll-down").hide();
        $("#no-more-products").show();
      } else {
        $("#scroll-down").show();
        $("#no-more-products").hide();
      }

      let scrollTop = $(window).scrollTop();
      let scrollHeight = $(document).height();
      let windowHeight = $(window).height();
      // console.log(scrollTop / scrollHeight * 100);

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        // Move down
        if (scrollTop + windowHeight === scrollHeight) {
          if (this.page < this.maxPage) {
            this.page++;
            this.fetchItems();
            // move to top
            isAutoScrolling = true;
            $("html, body").animate({ scrollTop: scrollHeight * 0.05 }, 500, () => {
              isAutoScrolling = false;
            });
          }
        }

        // Move up
        if (scrollTop === 0) {
          if (this.page > 1) {
            this.page--;
            this.fetchItems();
            isAutoScrolling = true;
            $("html, body").animate({ scrollTop: scrollHeight - windowHeight + 200 }, 500, () => {
              isAutoScrolling = false;
            });
          }
        }
      }, 300); // Adjust the debounce time (in milliseconds) as needed
    });
  }

  handleSuccess(response) {
    // console.log(response);
    response.data.forEach(product => {
      const card = new ProductCard(product, "/products/" + product.id);
      $(this.parent).prepend(card.render());
      // animate card
    });

    if (response.links.next || response.prev || response.meta.current_page > 1) {
      const links = new Pagination(response.links, response.meta.current_page).render("#paginations");
      links.onClick(page => this.handlePage(page));
      this.maxPage = response.meta.last_page;
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
    let queries = {
      page: this.page,
      limit: 20,
      sort: "updated_at",
      order: "desc"
    };

    Object.keys(queries).forEach(key => {
      q += key + "=" + queries[key] + "&";
    });
    q.slice(0, -1);

    ajaxRequest.get({
      url: this.url + "?" + q,
      onSuccess: response => {
        this.handleSuccess(response);
      },
      onError: error => {
        console.log(error);
        $(".scroll-loader").hide();
      }
      // showLoader: false,
    });
  }
}
