import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class PromosCreate {
  constructor() {
    this.carousel = null;
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
    $(document).ready(() => {
      $("#image-input").change(() => {
        this.images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.carousel = new Carousel({
          id: "promos-create",
          images: this.images
        });
      });

      $(".prev").click(() => {
        if (this.carousel) this.carousel.prev();
      });

      $(".next").click(() => {
        if (this.carousel) this.carousel.next();
      });
    });

    $("#save-item, #cancel").hide();
    $("#item-form").change(() => {
      $("#save-item, #cancel").show();
    });
  }

  setupForm() {
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
          this.resetForm();
        }
      });
    });

    $("#save-item").click(() => {
      $("#item-form").submit();
    });
  }

  setupValidation() {
    $("#item-form").validate({
      rules: {
        name: {
          required: true,
          pattern: /^(?:[A-Z0-9][a-zA-Z0-9]*|[0-9]+[a-zA-Z0-9]*)(?: [a-zA-Z0-9]+)*$/
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
          pattern: "Please enter a valid name: Capitalize the first letter"
        },
        slug: {
          required: "Slug is required",
          pattern: "Please enter a valid slug: It should only contain letters, numbers, and hyphens, and cannot start or end with a hyphen"
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
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();
    $(".error-border").removeClass("error-border border-red-400");

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
