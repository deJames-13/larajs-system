import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class CategoriesCreate {
  constructor({ target: target }) {
    this.carousel = null;
    this.target = target;
    this.images = ["https://placehold.co/400x600?text=item"];
    this.init();
    this.setupForm();
    this.setupValidation();
  }

  init() {
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

  setupValidation() {
    $(this.target)
      .find("#item-form")
      .validate({
        rules: {
          name: {
            required: true,
            minlength: 3
          },
          slug: {
            required: true,
            minlength: 3
          },
          description: {
            required: true,
            minlength: 10
          },

          status: {
            required: true
          }
        },
        messages: {
          name: {
            required: "Name is required",
            minlength: "Name must be at least 3 characters long"
          },
          sluc: {
            required: "Slug is required",
            minlength: "Slug must be at least 3 characters long"
          },
          description: {
            required: "Description is required",
            minlength: "Description must be at least 10 characters long"
          },

          status: {
            required: "Status is required"
          }
        },
        errorElement: "span",
        errorPlacement: (error, element) => {
          error.addClass("text-red-400 text-sm italic my-1");
          element.addClass("border-red-400");
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

    const formData = new FormData(form);
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

    ajaxRequest.post({
      url: "/api/categories",
      data: formData,
      token: token,
      onSuccess: response => {
        Swal.fire("Category Added!", "Your category has been added.", "success").then(() => {
          $(this.target).find("#item-form").trigger("reset");
          $(this.target).find("#save-item, #cancel").hide();
          $(this.target).find("input").removeClass("border-red-400");
          $(this.target).find("#item-form").validate().resetForm();
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
