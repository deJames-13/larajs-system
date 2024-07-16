import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class BrandsEdit {
  constructor() {
    this.id = null;
    this.carousel = null;
    this.brand = {};
    this.images = ["https://placehold.co/400x600?text=item"];

    this.init();
    // this.setupValidation();
  }

  init() {
    this.id = $("#item-form").data("id");
    this.fetchBrand(this.id);

    $("#image-input").change(() => {
      this.images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
      this.carousel = new Carousel(".item-carousel", this.images, ".prev", ".next");
    });

    $(".prev").click(() => {
      if (this.carousel) this.carousel.prev();
    });

    $(".next").click(() => {
      if (this.carousel) this.carousel.next();
    });

    // Initially hide save and cancel buttons
    $("#save-item, #cancel").hide();

    // On form change, show save and cancel buttons
    $("#item-form").change(() => {
      $("#save-item, #cancel").show();
    });

    $("#cancel").click(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!"
      }).then(result => {
        if (result.isConfirmed) {
          $("#save-item, #cancel").hide();
          this.fetchBrand(this.id);
        }
      });
    });

    $("#item-form").submit(event => {
      event.preventDefault();

      const token = document.querySelector('meta[name="api-token"]').getAttribute("content");
      const formData = new FormData($("#item-form")[0]);
      formData.append("_method", "PUT");

      ajaxRequest.post({
        url: "/api/brands/" + this.id,
        token: token,
        data: formData,
        onSuccess: response => this.handleSubmit(response.data || {}),
        onError: response => this.handleError((response.responseJSON && response.responseJSON.errors) || {})
      });
    });

    $("#save-item").click(() => {
      $("#item-form").submit();
    });
  }

  loadCarousel() {
    this.carousel = new Carousel(".item-carousel", this.images, ".prev", ".next");
  }

  populateForm(brand) {
    if (!brand) return;
    Object.keys(brand).forEach(key => {
      $(`#${key}`).val(brand[key]);
      if ($(`#${key}`).is("select")) {
        $(`#${key}`).val(brand[key]);
      }
    });
  }

  fetchBrand(id) {
    $("#image-input").val("");
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();

    ajaxRequest.get({
      url: "/api/brands/" + id,
      onSuccess: response => {
        if (response.data) {
          if (response.data.images && response.data.images.length > 0) {
            this.images = response.data.images.map(image => "/" + image.path);
          }
          this.brand = response.data;
          this.loadCarousel();
          this.populateForm(this.brand);
        }
        return {};
      }
    });
  }

  updateForm(data) {
    Swal.fire("Brand Updated!", "Your brand has been updated.", "success").then(() => {
      $("#save-item, #cancel").hide();
      this.brand = data;
      this.populateForm(data);
    });
  }

  handleSubmit(data) {
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();
    this.updateForm(data);
  }

  handleError(errors) {
    console.log(errors);
    Object.keys(errors).forEach(field => {
      let input = $(`#${field}`);
      input.addClass("input-error");
      input.after(`<p class="text-error text-sm">${errors[field]}</p>`);
    });
  }
}
