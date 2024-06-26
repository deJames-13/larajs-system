export default class Promos {
    constructor({ url, parent }) {
        this.promos = [];
        this.url = url;
        this.parent = parent;

        this.fetchPromos();
    }

    handleSuccess(data) {
        data.forEach(promo => {
            const promoData = {
                parent: this.parent,
                imageSrc: promo.image, // Adjust accordingly if your promo object has an image attribute
                altText: promo.name,
                title: promo.name,
                text: promo.description,
                buttonText: 'View Details',
                buttonAction: () => {
                    window.location.replace('/promos/' + promo.id); // Assuming promo has an id attribute
                }
            };
            const card = new Card(promoData);
            card.elements.wrapper.addClass('max-w-xs hover');
            card.elements.wrapper.on('click', () => {
                window.location.replace('/promos/' + promo.id);
            });
        });
    }

    fetchPromos() {
        ajaxRequest.get({
            url: this.url,
            onSuccess: ({ data }) => { this.handleSuccess(data) },
            onError: (error) => { console.log(error) }
        });
    }
}
