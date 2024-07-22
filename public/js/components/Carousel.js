const dProps = {
  id: "carousel",
  selector: ".item-carousel",
  images: ["https://placehold.co/400x600?text=item"],
  prevButton: ".prev",
  nextButton: ".next",
  autoSlideInterval: 5000
};
export default class Carousel {
  constructor(props = {}) {
    Object.assign(this, dProps, props);
    this.index = 0;
    this.direction = "Right";
    this.autoSlideID = null;
    if (!this.images.length) this.images.push(dProps.images[0]);
    this.init();
  }

  init() {
    this.updateCarousel();
    this.images.length > 1 && this.startAutoSlide();
  }
  startAutoSlide() {
    this.autoSlideID = setInterval(() => {
      if (!$("#" + this.id).is(":visible")) {
        console.log("Carousel is not visible, stopping auto slide");
        return this.stopAutoSlide();
      }
      this.next();
    }, this.autoSlideInterval);
  }

  stopAutoSlide() {
    if (this.autoSlideID) {
      clearInterval(this.autoSlideID);
      this.autoSlideID = null;
    }
  }

  renderImage(image) {
    // if (!(this.images.length > 1)) return;
    let img = $("<img>");
    img.attr("src", image);

    img.attr("class", `cursor-zoom-in max-h-[300px] object-contain animate__animated animate__fadeIn${this.direction}Big`);

    $(this.selector).append(img);
  }

  prev() {
    this.index = Math.max(this.index - 1, 0);
    if (this.index === 0) this.index = this.images.length - 1;
    this.direction = "Left";
    this.updateCarousel();
  }

  next() {
    if (this.images.length === this.index + 1) this.index = 0;
    else this.index = Math.min(this.index + 1, this.images.length - 1);
    this.direction = "Right";
    this.updateCarousel();
  }

  updateCarousel() {
    // console.log(this.images.length);
    !(this.images.length > 1) && this.stopAutoSlide();
    !(this.images.length > 1) ? $(`${this.prevButton}, ${this.nextButton}`).hide() : $(this.prevButton, this.nextButton).removeClass("hidden").show();
    const img = $(this.selector).find("img");
    img.length
      ? img.fadeOut(500, () => {
          $(this.selector).empty();
          this.renderImage(this.images[this.index]);
        })
      : this.renderImage(this.images[this.index]);
  }

  render() {
    // remove previes corousels
    $(this.selector).empty();
    const HTML = /* HTML */ `
      <div class="relative" id="${this.id}">
        <button type="button" class="btn btn-ghost aspect-square z-[100] top-1/2  absolute prev m-4 hover:scale-110 transition-all hover:text-primary">
          <i class="fas fa-angle-left"></i>
        </button>
        <button type="button" class="btn btn-ghost aspect-square z-[100] top-1/2 right-0  absolute next m-4 hover:scale-110 transition-all hover:text-primary">
          <i class="fas fa-angle-right"></i>
        </button>
        <div class="flex-grow item-carousel hover h-[300px] max-h-[300px] flex items-center justify-center overflow-hidden"></div>
      </div>
    `;
    return HTML;
  }
}
