const defaultProps = {
    parent: '',
    id: '',
    title: '',
    description: '',
    bottomLabel: '',
    image: '',
    link: '',
    onClick: () => { }


}

export default class SearchItem {
    card = null;
    constructor(props = {}) {
        Object.assign(this, defaultProps, props);
    }

    render() {
        const HTML = `
        	<!--  SEARCH RESULT ITEM -->
            <div data-id="${this.id}"  data-link="${link}"
                class="flex flex-col  p-4 cursor-pointer rounded-lg border-primary hover:bg-secondary hover:scale-105 hover:border-b-2 hover:text-primary hover:bg-opacity-20 hover:shadow-xl transition ease-in animated__animate animated__fadeInLeft">
                <h3 class="font-bold text-lg">
                    ${this.title}
                </h3>
                <h5 class="text-sm text-gray-600">
                    ${this.description}
                </h5>
                <h4 class="font-bold text-md">
                    ${this.bottomLabel}
                </h4>
            </div>
        `;

        this.card = $(HTML);
        $(this.parent).html(this.card);
        return this;
    }
}