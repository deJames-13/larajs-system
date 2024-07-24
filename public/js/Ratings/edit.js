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
    $("#isShowUser").prop("checked", this.order.rating.isShowUser);
    $("#rating-username").text(this.order.rating.isShowUser ? `@${this.order.customer.username}` : "Anonymous");
    if (rating.images && rating.images.length > 0) {
      this.images = rating.images.map(image => "/" + image.path);
    }
    this.carousel = new Carousel({
      id: "ratings-edit",
      images: this.images
    });
  }
}
