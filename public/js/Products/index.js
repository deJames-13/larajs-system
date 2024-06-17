import ajaxRequest from '../assets/ajaxRequest.js';
import { Card } from '../components/Card.js';

export default class Products {
    constructor({ url, parent }) {
        this.products = [];
        this.url = url;
        this.parent = parent;

        this.fetchItems();
    }


    handleSuccess(data) {
        data.forEach(product => {
            const data = {
                parent: this.parent,
                imageSrc: product.image,
                altText: product.name,
                title: 'P' + product.price,
                text: product.name,
                buttonText: 'Buy Now',
                buttonAction: () => {
                    window.location.replace('/products/' + product.id)
                }
            };
            const card = new Card(data);
            card.elements.wrapper.addClass('max-w-xs hover');
            card.elements.wrapper.on('click', () => {
                window.location.replace('/products/' + product.id)
            });
        }
        );
    }

    fetchItems() {
        ajaxRequest.get({
            url: this.url,
            onSuccess: ({ data }) => { this.handleSuccess(data) },
            onError: (error) => { console.log(error) }
        });
    }



}
