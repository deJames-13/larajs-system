import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class PromosEdit {
  constructor() {
    this.carousel = null;
    this.images = ["https://placehold.co/400x600?text=item"];
    this.init();
    this.setupForm();
    this.validate();
  }

  init() {
    $(document).ready(() => {
      const id = $("#item-form").data("id");

      // Fetch promo data and populate form
      this.fetchPromo(id);

      // CAROUSEL
      $("#image-input").change(() => {
        this.images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.loadCarousel();
      });

      $(".prev").click(() => {
        if (this.carousel) this.carousel.prev();
      });

      $(".next").click(() => {
        if (this.carousel) this.carousel.next();
      });

      $("#save-item, #cancel").hide();
      $("#item-form").change(() => {
        $("#save-item, #cancel").show();
      });
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
          $("#save-item, #cancel").hide();
          this.fetchPromo($("#item-form").data("id"));
        }
      });
    });

    $("#save-item").click(() => {
      $("#item-form").submit();
    });
  }

  validate() {
    $("#item-form").validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
          maxlength: 255
        },
        slug: {
          required: true,
          minlength: 2,
          maxlength: 100
        },
        description: {
          required: true,
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
        // Add more rules as necessary
      },
      messages: {
        name: {
          required: "Please enter a name",
          minlength: "Name must be at least 2 characters",
          maxlength: "Name must not exceed 255 characters"
        },
        slug: {
          required: "Please enter a slug",
          minlength: "Slug must be at least 2 characters",
          maxlength: "Slug must not exceed 100 characters"
        },
        description: {
          required: "Please enter a description",
          maxlength: "Description must not exceed 500 characters"
        },
        image: {
          required: "Please select an image"
        },
        status: {
          required: "Please select a status"
        },
        discount: {
          required: "Please enter a discount",
          number: "Discount must be a number",
          min: "Discount must be at least 0",
          max: "Discount must be at most 100"
        },
        start_date: {
          required: "Please select a start date",
          date: "Please enter a valid date"
        },
        end_date: {
          required: "Please select an end date",
          date: "Please enter a valid date"
        }
        // Add more messages as necessary
      },
      errorElement: "span",
      errorPlacement: function (error, element) {
        error.addClass("input-error text-error text-red-400 text-sm italic my-1");
        element.addClass("error-border border-red-400");
        error.insertAfter(element);
      },
      submitHandler: form => {
        this.handleFormSubmission(form);
      }
    });
  }

  loadCarousel() {
    this.carousel = new Carousel({
      id: "promos-edit",
      images: this.images
    });
  }

  fetchPromo(id) {
    $("#image-input").val("");
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();
    $(".error-border").removeClass("error-border border-red-400");

    ajaxRequest.get({
      url: "/api/promos/" + id,
      onSuccess: response => {
        if (response.data) {
          if (response.data.images && response.data.images.length > 0) {
            this.images = response.data.images.map(image => "/" + image.path);
          }
          this.loadCarousel();
          this.populateForm(response.data);
        }
      }
    });
  }

  populateForm(promo) {
    Object.keys(promo).forEach(key => {
      $(`#${key}`).val(promo[key]);
      // if input is date, format it
      if (key.includes("date")) {
        $(`#${key}`).val(new Date(promo[key]).toISOString().split("T")[0]);
      }
    });
  }

  handleFormSubmission(form) {
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();
    $(".error-border").removeClass("error-border border-red-400");

    const formData = new FormData(form);
    formData.append("_method", "PUT");
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

    ajaxRequest.post({
      url: "/api/promos/" + $("#item-form").data("id"),
      data: formData,
      token: token,
      onSuccess: response => {
        this.updateForm(response.data || {});
      },
      onError: response => {
        this.handleError((response.responseJSON && response.responseJSON.errors) || {});
      }
    });
  }

  updateForm(data) {
    Swal.fire("Promo Updated!", "Your promo has been updated.", "success").then(() => {
      $("#save-item, #cancel").hide();
      this.fetchPromo($("#item-form").data("id"));
    });
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
