import ajaxRequest from '../assets/ajaxRequest.js';
import { debounce } from '../assets/debounce.js';
import Pagination from '../components/Paginate.js';
import SearchItem from '../components/SearchItem.js';

export default class SearchPage {
    content = $("#search-contents");
    searchCount = $("#found-count");
    foundCount = $("#search-count");
    searchInput = $("#search-input-main");
    searchBtn = $("#search-button");
    paginations = $("#paginations");
    results = [];
    page = 1;

    constructor() {
        this.bindEvents();
        this.init();
    }
    handlePage(page) {
        this.page = page;
        this.fetchSearch();
    }

    paginate(response) {
        $('#paginations').empty();
        const { pagination, current_page, last_page } = response;
        if (pagination.next || pagination.prev || current_page > 1) {
            const links = new Pagination(pagination, current_page).render(
                '#paginations');
            links.onClick(page => this.handlePage(page));
            this.maxPage = last_page;
        }
    }


    createResultItem(result) {
        const searchItem = new SearchItem({
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
        console.log(response);
        this.content.empty();

        this.paginate(response);
        const { found_count, total_count } = response;

        this.searchCount.text(found_count);
        this.foundCount.text(total_count);

        this.results = response.results;
        this.results.forEach(result => {
            this.createResultItem(result);
        });

    }

    fetchSearch(term) {
        const payload = {
            term: term || this.searchInput.val(),
        };

        ajaxRequest.post({
            url: '/api/search?page=' + this.page,
            data: payload,
            onSuccess: response => this.getResults(response),
            onError: response => {
                console.log(response);
            },


        });

    }

    onSearch(s) {
        if (s.length >= 3) {
            this.fetchSearch();
        }
    }

    bindEvents() {
        const doSearch = debounce(() => {
            this.onSearch(this.searchInput.val());
        }, 500);

        this.searchInput.on('keyup', doSearch);

        this.searchBtn.on('click', () => {
            this.fetchSearch();
        });


    }

    init() {
        // if url has q parameter and value
        const urlParams = new URLSearchParams(window.location.search).get('q');
        if (urlParams) {
            this.searchInput.val(urlParams);
            this.fetchSearch();
        }


    }
}