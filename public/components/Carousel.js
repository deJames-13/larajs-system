export default class Carousel {
    constructor(selector, images = [], prevButton, nextButton) {
        this.selector = selector;
        this.images = images;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.index = 0;
        this.init();
    }

    init() {
        $(this.selector).empty();
        for (let i = 0; i < this.images.length; i++) {
            let img = $('<img>');
            img.attr('src', this.images[i]);
            $(this.selector).append(img);
        }
        this.updateCarousel();
    }

    prev() {
        this.index = Math.max(this.index - 1, 0);
        this.updateCarousel();
    }

    next() {
        this.index = Math.min(this.index + 1, $(this.selector).children().length - 1);
        this.updateCarousel();
    }

    updateCarousel() {
        $(this.selector).children().each((i, img) => {
            if (i === this.index) {
                $(img).fadeIn();
            } else {
                $(img).fadeOut();
            }
        });
        if (this.images.length <= 1) {
            $(this.prevButton).hide();
            $(this.nextButton).hide();
        } else {
            $(this.prevButton).removeClass('hidden');
            $(this.nextButton).removeClass('hidden');
            $(this.prevButton).show();
            $(this.nextButton).show();
        }
    }
}