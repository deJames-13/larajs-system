// TODO: fix card
export default class Categories {
    constructor({ url, parent }) {
        this.categories = [];
        this.url = url;
        this.parent = parent;

        this.fetchCategories();
    }

    handleSuccess(data) {
        data.forEach(category => {
            const categoryData = {
                parent: this.parent,
                imageSrc: category.image, // Adjust accordingly if your category object has an image attribute
                altText: category.name,
                title: category.name,
                text: category.description,
                buttonText: 'View Details',
                buttonAction: () => {
                    window.location.replace('/categories/' + category.id); // Assuming category has an id attribute
                }
            };
            const card = new Card(categoryData);
            card.elements.wrapper.addClass('max-w-xs hover');
            card.elements.wrapper.on('click', () => {
                window.location.replace('/categories/' + category.id);
            });
        });
    }

    fetchCategories() {
        ajaxRequest.get({
            url: this.url,
            onSuccess: ({ data }) => { this.handleSuccess(data) },
            onError: (error) => { console.log(error) }
        });
    }
}
