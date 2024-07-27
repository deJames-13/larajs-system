export default class ProductCard {
  constructor(product, redirectUrl) {
    this.product = product;
    this.redirectUrl = redirectUrl;

    if (this.product.images && this.product.images.length > 0) {
      this.product.image_path = this.product.images[0].path;
    }

    this.render();
  }

  makeRatingStars(ratings = []) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const star = /* HTML */ ` <i class="fas fa-star ${i < ratings.average ? "text-primary" : ""}"></i> `;
      stars.push(star);
    }
    const HTML = /* HTML */ `
      <!-- Ratings -->
      <div class="flex items-center space-x-1 my-2">
        <!-- Starts -->
        <div class="flex items-center text-secondary">${stars.join("")}</div>
        <p class="text-xs"><span class="text-primary font-bold">${(ratings.average && ratings.average.toFixed(2)) || 0}</span> (${ratings.count || 0})</p>
      </div>
    `;
    return HTML;
  }

  makeCategoryPills(categories) {
    let limit = 3;
    const pills = [];
    categories.forEach(category => {
      if (limit <= 0) return;
      const pill = /* HTML */ ` <span class="bg-primary text-white font-bold px-2 py-1 text-xs rounded-full">${category.name}</span> `;
      pills.push(pill);
      limit--;
    });
    return pills.join("");
  }

  render() {
    const ratings = this.product.ratings;

    const brand = (this.product.brands.length > 0 && this.product.brands[0].name) || "";
    const card = /* HTML */ `
      <!-- CARD -->
      <div class="item-card animate__animated animate__bounceIn p-2 shadow-md bg-white overflow-clip rounded-t-lg h-full max-w-72 max-h-96 container">
        <!-- Parent div with group class for hover effect -->
        <div class="group relative transition-all ease-in overflow-clip rounded-t-lg" onclick="window.location.replace('${this.redirectUrl}')">
          <!-- Image -->
          <div class="container h-[200px] image-wrapper flex justify-center">
            <img src="${this.product.image_path ?? "https://placehold.co/600x400?text=" + this.product.name}" alt="${this.product.name}" class="h-full aspect-square" />
          </div>
          <!-- Buy Button that will only show if image is hovered -->
          <a
            href="${this.redirectUrl}"
            class="absolute bottom-0 m-auto h-10 w-full px-4 py-2 bg-secondary text-white font=bold opacity-0 transition-all ease-in group-hover:opacity-100 hover:font-bold"
          >
            Buy Now
          </a>
        </div>

        <!-- Content -->
        <div class="my-2">
          <!-- Categories -->
          <div id="categries-wrapper" class="flex flex-wrap items-center gap-2">${this.makeCategoryPills(this.product.categories)}</div>
          <span class="text-sm font-semibold uppercase"> ${brand} </span>
          <p class="font-light sm:text-md">${this.product.name}</p>
          <span class="font-bold">P${this.product.price}</span>

          ${this.makeRatingStars(ratings)}
        </div>
      </div>
    `;
    return card;
  }
}
