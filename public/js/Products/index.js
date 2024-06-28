import ajaxRequest from '../assets/ajaxRequest.js';
import Pagination from '../components/Paginate.js';
import ProductCard from '../components/ProductCard.js';

export default class Products {
    constructor({ url, parent }) {
        this.products = [];
        this.url = url;
        this.parent = parent;
        this.page = 1;
        this.maxPage = 1;

        this.fetchItems();
        this.initInfinitScroll();
    }

    handlePage(page) {
        this.page = page;
        this.fetchItems(this.page);
    }

    initInfinitScroll() {
        let debounceTimer;
        let isAutoScrolling = false;
        $(window).scroll(() => {
            if (isAutoScrolling) return;

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                // Move down
                if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                    if (this.page < this.maxPage) {
                        this.page++;
                        this.fetchItems();
                        // move to top
                        isAutoScrolling = true;
                        $('html, body').animate({ scrollTop: $(document).height() * 0.2 }, 500, () => {
                            isAutoScrolling = false;
                        });
                    }
                }

                // Move up
                if ($(window).scrollTop() < 100) {
                    if (this.page > 1) {
                        this.page--;
                        this.fetchItems();
                        isAutoScrolling = true;
                        // move to bottom
                        $('html, body').animate({ scrollTop: $(document).height() * 0.2 }, 500, () => {
                            isAutoScrolling = false;
                        });
                    }
                }
                // console.log(this.page, this.maxPage);
            }, 300); // Adjust the debounce time (in milliseconds) as needed
        });
    }

    handleSuccess(response) {
        $('#loading').show()

        // console.log(response);
        response.data.forEach(product => {
            const card = new ProductCard(product, '/products/' + product.id);
            $(this.parent).prepend(card.render());
            // animate card

        });


        if (response.links.next || response.prev || response.meta.current_page > 1) {
            const links = new Pagination(response.links, response.meta.current_page).render(
                '#paginations');
            links.onClick(page => this.handlePage(page));
            this.maxPage = response.meta.last_page;
        } else {
            $('#paginations').empty();
            $('#search-bar').hide();
        }

        $('#loading').hide()

    }

    fetchItems() {
        $(this.parent).empty();
        $('#paginations').empty();

        let queries = [
            'page=' + this.page,
        ]
        let q = queries.join('&');
        ajaxRequest.get({
            url: this.url + '?' + q,
            onSuccess: (response) => { this.handleSuccess(response) },
            onError: (error) => { console.log(error) }
        });
    }



}
