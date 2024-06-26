export default class ProductCard {
  constructor(product, redirectUrl) {
    this.product = product;
    this.redirectUrl = redirectUrl;


    this.render();
  }

  render() {
    const card = `
        <!-- CARD -->
      <div class="p-2 shadow-md bg-white overflow-clip rounded-t-lg h-full max-h-96">
        <!-- Parent div with group class for hover effect -->
        <div class="group relative transition-all ease-in overflow-clip rounded-t-lg" onclick="window.location.replace('${this.redirectUrl}')">
          <!-- Image -->
          <div class="987 65 image-wrapper flex justify-center">
            <img src="${this.product.image_path ?? "https://placehold.co/600x400?text=" + this.product.name}" alt="${this.product.name}" class="object-cover ">
          </div>
          <!-- Buy Button that will only show if image is hovered -->
          <a href="${this.redirectUrl}"
            class="absolute bottom-0 m-auto h-10 w-full px-4 py-2 bg-secondary text-white font=bold opacity-0 transition-all ease-in group-hover:opacity-100 hover:font-bold">
            Buy Now
          </a>
        </div>

        <!-- Content -->
        <div class="my-2">
          <span class="text-sm font-semibold uppercase">
            ${this.product.brand ?? "Brand"}
          </>
            <p class="font-light">${this.product.name}</p>
            <span class="font-bold">P${this.product.price}</span>
        </div>
        <!-- Ratings -->
        <div class="flex items-center space-x-1">
          <!-- Starts -->
          <div class="flex items-center text-secondary">
            <i class="fas fa-star text-primary"></i>
            <i class="fas fa-star text-primary"></i>
            <i class="fas fa-star text-primary"></i>
            <i class="fas fa-star text-primary"></i>
            <i class="fas fa-star"></i>
          </div>
          <p class="text-xs">69</p>
        </div>
      </div>
        `
    return card;
  }
}