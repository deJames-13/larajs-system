import Carousel from "../components/Carousel.js";
import RatingsCreate from "./create.js";

export default class RatingsEdit extends RatingsCreate {
  constructor(props = {}) {
    super(props);
    this.populateForm();
  }
  populateForm() {
    const rating = this.order.rating;
    console.log(rating);
    Object.keys(rating).forEach(key => {
      $(`[name="${key}"]`).val(rating[key] || "");
    });
    $("#is_show_user").prop("checked", this.order.rating.is_show_user);
    $("#rating-username").text(this.order.rating.is_show_user ? `@${this.order.customer.username}` : "Anonymous");
    if (rating.images && rating.images.length > 0) {
      this.images = rating.images.map(image => "/" + image.path);
    }
    this.carousel = new Carousel({
      id: "ratings-edit",
      images: this.images
    });
  }
}
