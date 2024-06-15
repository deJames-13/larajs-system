export class Card {
    constructor(cardInfo) {
        // cardInfo = {
        //     parent,
        //     imageSrc,
        //     altText,
        //     title,
        //     text,
        //     buttonText,
        //     buttonAction
        // }

        this.elements = {
            wrapper: null,
            figure: null,
            img: null,
            body: null,
            title: null,
            content: null,
            actions: null,
            button: null,
        };

        this.card = cardInfo;
        this.id = new Date().getTime();



        this.render();
    }

    update(newCardInfo) {
        const card = $(`#card-${this.id}`);
        // update elements
        card.find('img').attr('src', newCardInfo.imageSrc);
        card.find('img').attr('alt', newCardInfo.altText);
        card.find('.card-title').text(newCardInfo.title);
        card.find('.card-text').text(newCardInfo.text);
        card.find('.btn').text(newCardInfo.buttonText);
    }

    render() {
        const el = this.elements;
        el.wrapper = $('<div>', {
            id: `card-${this.id}`,
            class: 'card bg-base-100 shadow-xl '
        });
        el.figure = $('<figure>');

        el.img = $('<img>', {
            src: this.card.imageSrc ?? "https://placehold.co/600x400?text=" + this.card.altText,
            alt: this.card.altText
        });

        el.body = $('<div>', { class: 'card-body' });

        el.title = $('<h2>', {
            class: 'md:text-sm  font-bold',
            text: this.card.title

        });

        el.content = $('<p>', {
            text: this.card.text,
            class: 'md:text-xs'
        });

        el.actions = $('<div>', { class: 'card-actions justify-end' });

        el.button = $('<button>', {
            class: 'btn btn-primary',
            id: `btn-${this.id}`,
            text: this.card.buttonText
        });

        el.button.on('click', this.card.buttonAction ?? (() => { }));

        el.figure.append(el.img);
        el.actions.append(el.button);
        el.body.append(el.title, el.content, el.actions);
        el.wrapper.append(el.figure, el.body);
        $(`${this.card.parent} `).append(el.wrapper);
    }
}