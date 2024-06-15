import ajaxRequest from '../assets/ajaxRequest.js';
import { Card } from '../components/ItemCard.js';

export default class Items {
    constructor({ url, parent }) {
        this.items = [];
        this.url = url;
        this.parent = parent;

        this.fetchItems();
    }


    handleSuccess(data) {
        data.forEach(item => {
            const data = {
                parent: this.parent,
                imageSrc: item.image,
                altText: item.name,
                title: 'P' + item.price,
                text: item.name,
                buttonText: 'Buy Now',
                buttonAction: () => {
                    window.location.replace('/items/' + item.id)
                }
            };
            const card = new Card(data);
            card.elements.wrapper.addClass('max-w-xs hover');
            card.elements.wrapper.on('click', () => {
                window.location.replace('/items/' + item.id)
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
