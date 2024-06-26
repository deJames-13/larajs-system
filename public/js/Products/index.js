import ajaxRequest from '../assets/ajaxRequest.js';
import ProductCard from '../components/ProductCard.js';

export default class Products {
    constructor({ url, parent }) {
        this.products = [];
        this.url = url;
        this.parent = parent;

        this.fetchItems();
    }


    handleSuccess(data) {
        $('#loading').show()

        data.forEach(product => {
            const card = new ProductCard(product, '/products/' + product.id);
        }
        );
        $('#loading').hide()

    }

    fetchItems() {
        ajaxRequest.get({
            url: this.url,
            onSuccess: ({ data }) => { this.handleSuccess(data) },
            onError: (error) => { console.log(error) }
        });
    }



}
