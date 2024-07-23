import RatingsCreate from "./create.js";

export default class RatingsEdit extends RatingsCreate {
  constructor(props = {}) {
    super(props);
    this.populateForm();
  }
  populateForm() {
    const rating = this.order.rating;
    console.log(this);
  }
}
