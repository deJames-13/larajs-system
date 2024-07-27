const filters = [
  { label: "All", value: "all" },
  { label: "Name", value: "name" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Brand Name", value: "brand-name" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Lowest Price", value: "lowest-price" },
  { label: "Highest Price", value: "highest-price" }
];

export const sortBy = {
  display: true,
  filters: filters,
  selected: { label: "ID", value: "id" },
  order: "desc"
};

export const initInfiniteScroll = instance => {
  let debounceTimer;
  let isAutoScrolling = false;
  $(window).scroll(() => {
    if (isAutoScrolling) return;

    if (instance.queries.page === instance.queries.maxPage) {
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
        if (instance.queries.page < instance.queries.maxPage) {
          instance.queries.page++;
          instance.goToPage(instance.queries.page);
          // move to top
          isAutoScrolling = true;
          $("html, body").animate({ scrollTop: scrollHeight * 0.05 }, 500, () => {
            isAutoScrolling = false;
          });
        }
      }

      // Move up
      if (scrollTop === 0) {
        if (instance.queries.page > 1) {
          instance.queries.page--;
          instance.goToPage(instance.queries.page);
          isAutoScrolling = true;
          $("html, body").animate({ scrollTop: scrollHeight - windowHeight + 200 }, 500, () => {
            isAutoScrolling = false;
          });
        }
      }
    }, 300); // Adjust the debounce time (in milliseconds) as needed
  });
};
