import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class PromosCreate {
  constructor({ target: target }) {
    this.carousel = null;
    this.target = target;
    this.images = ["https://placehold.co/400x600?text=item"];
    this.init();
    this.setupForm();
    this.setupValidation();
  }

  resetForm() {
    $(this.target).find("#item-form").trigger("reset");
    $(this.target).find("#save-item, #cancel").hide();
    $(this.target).find("input").removeClass("border-red-400");
    $(this.target).find("#item-form").validate().resetForm();
  }

  init() {
    $(this.target)
      .find("#image-input")
      .change(() => {
        this.images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.carousel = new Carousel({
          id: "promos-create",
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
            this.resetForm();
          }
        });
      });
    $(this.target)
      .find("#save-item")
      .click(() => {
        $(this.target).find("#item-form").submit();
      });
  }

  setupValidation() {
    $(this.target)
      .find("#item-form")
      .validate({
        rules: {
          name: {
            required: true,
            pattern: /^[A-Za-z0-9\s-]+$/
          },
          slug: {
            required: true,
            pattern: /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/
          },
          description: {
            required: true,
            minlength: 10,
            maxlength: 500
          },
          image: {
            required: true
          },
          status: {
            required: true
          },
          discount: {
            required: true,
            number: true,
            min: 0,
            max: 100
          },
          start_date: {
            required: true,
            date: true
          },
          end_date: {
            required: true,
            date: true
          }
        },
        messages: {
          name: {
            required: "Name is required",
            pattern: "Name must contain only letters, numbers, and spaces"
          },
          slug: {
            required: "Slug is required",
            pattern: "Slug must contain only letters, numbers, and dashes"
          },
          description: {
            required: "Description is required",
            minlength: "Description must be at least 10 characters long"
          },
          image: {
            required: "Image is required"
          },
          status: {
            required: "Status is required"
          },
          discount: {
            required: "Discount is required",
            number: "Discount must be a number",
            min: "Discount must be at least 0",
            max: "Discount cannot be more than 100"
          },
          start_date: {
            required: "Start date is required",
            date: "Please enter a valid date"
          },
          end_date: {
            required: "End date is required",
            date: "Please enter a valid date"
          }
        },
        errorElement: "span",
        errorPlacement: (error, element) => {
          error.addClass("input-error text-error text-red-400 text-sm italic my-1");
          element.addClass("error-border border-red-400");
          error.insertAfter(element);
        },
        submitHandler: form => {
          this.handleFormSubmission(form);
        }
      });
  }

  handleFormSubmission(form) {
    $(this.target).find(".input-error").removeClass("input-error");
    $(this.target).find(".text-error").remove();
    $(this.target).find(".error-border").removeClass("error-border border-red-400");

    const formData = new FormData(form);
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

    ajaxRequest.post({
      url: "/api/promos",
      data: formData,
      token: token,
      onSuccess: response => {
        Swal.fire("Promo Added!", "Your promo has been added.", "success").then(() => {
          this.resetForm();
        });
      },
      onError: xhr => {
        xhr.responseJSON &&
          Object.keys(xhr.responseJSON.errors).forEach(field => {
            let input = $(`#${field}`);
            input.addClass("input-error");
            input.after(`<p class="text-error text-sm">${xhr.responseJSON.errors[field]}</p>`);
          });
      }
    });
  }
}
