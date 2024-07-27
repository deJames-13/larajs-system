import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";
const props = { order: {}, target: null, setRating: () => {}, exit: () => {} };

export default class RatingsCreate {
  form = null;
  images = ["https://placehold.co/400x600?text=images"];
  carousel = null;
  constructor(p = {}) {
    Object.assign(this, props, p);
    this.init();
  }
  init() {
    this.form = $("#item-form");
    this.bindEvents();
    this.setupForm();
    this.setupValidation();
  }
  bindEvents() {
    $(this.target)
      .find("#image-input")
      .change(() => {
        this.images = Array.from($(this.target).find("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.carousel = new Carousel({
          id: "categories-create",
          images: this.images
        });
      });
    $(this.target)
      .find(".prev")
      .click(() => {
        if (this.carousel) this.carousel.prev();
      });

    $(this.target)
      .find(".next")
      .click(() => {
        if (this.carousel) this.carousel.next();
      });
    $(this.target).find("#save-item, #cancel").hide();
    $(this.target)
      .find("#item-form")
      .change(() => {
        $(this.target).find("#save-item, #cancel").show();
      });
  }
  setupValidation() {
    $(this.target)
      .find("#item-form")
      .validate({
        rules: {
          rating: {
            required: true
          },
          title: {
            pattern: /^[a-zA-Z0-9\s]+$/
          },
          comment: {
            required: true
          }
        },
        messages: {
          rating: {
            required: "Please select a rating."
          },
          comment: {
            required: "Please enter your feedback."
          },
          title: {
            pattern: "Only letters, numbers, and spaces are allowed."
          }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
          error.addClass("input-error text-error text-red-400 text-sm italic my-1");
          error.insertAfter(element);
        },
        submitHandler: form => {
          this.handleFormSubmission(form);
        }
      });
  }
  setupForm() {
    $(this.target)
      .find("#cancel")
      .click(() => {
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
            $(this.target).find("#item-form").trigger("reset");
            $(this.target).find("#save-item, #cancel").hide();
            $(this.target).find("input").removeClass("border-red-400");
            $(this.target).find("#item-form").validate().resetForm();
          }
        });
      });

    $(this.target)
      .find("#save-item")
      .click(() => {
        $(this.target).find("#item-form").submit();
      });
  }
  loadCarousel() {
    this.carousel = new Carousel({
      id: "ratings-edit",
      images: this.images
    });
  }
  handleFormSubmission(form) {
    $(this.target).find(".input-error").removeClass("input-error");
    $(this.target).find(".text-error").remove();
    const formData = new FormData(form);
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");
    ajaxRequest.post({
      url: "/api/orders/rate/" + this.order.id,
      data: formData,
      token: token,
      onSuccess: response => {
        Swal.fire("Review sent!", "Thank you for your feedback.", "success").then(() => {
          this.exit();
        });
      },
      onError: xhr => {
        xhr.responseJSON &&
          Object.keys(xhr.responseJSON.errors).forEach(field => {
            let input = $(this.target).find(`#${field}`);
            input.addClass("input-error");
            input.after(`<p class="text-error text-sm">${xhr.responseJSON.errors[field]}</p>`);
          });
      }
    });
  }
}
