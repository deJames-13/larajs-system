export default class Brands {
    constructor({ url, parent }) {
        this.brands = [];
        this.url = url;
        this.parent = parent;

        this.fetchBrands();
    }

    handleSuccess(data) {
        data.forEach(brand => {
            const brandData = {
                parent: this.parent,
                imageSrc: brand.image, // Adjust accordingly if your brand object has an image attribute
                altText: brand.name,
                title: brand.name,
                text: brand.description,
                buttonText: 'View Details',
                buttonAction: () => {
                    window.location.replace('/brands/' + brand.id); // Assuming brand has an id attribute
                }
            };
            const card = new Card(brandData);
            card.elements.wrapper.addClass('max-w-xs hover');
            card.elements.wrapper.on('click', () => {
                window.location.replace('/brands/' + brand.id);
            });
        });
    }

    fetchBrands() {
        ajaxRequest.get({
            url: this.url,
            onSuccess: ({ data }) => { this.handleSuccess(data) },
            onError: (error) => { console.log(error) }
        });
    }
}
