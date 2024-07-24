import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class BrandsEdit {
  constructor() {
    this.carousel = null;
    this.images = ["https://placehold.co/400x600?text=item"];
    this.init();
    this.setupForm();
    this.setupValidation();
  }

  init() {
    $(document).ready(() => {
      const id = $("#item-form").data("id");

      // Fetch brand data and populate form
      this.fetchBrand(id);

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
          this.fetchBrand($("#item-form").data("id"));
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
          minlength: 3
        },
        company: {
          required: true
        },
        website: {
          required: true,
          url: true
        },
        description: {
          required: true
        },
        logo: {
          required: true
        },
        status: {
          required: true
        },
        created_at: {
          required: true,
          date: true
        },
        updated_at: {
          required: true,
          date: true
        }
      },
      messages: {
        name: {
          required: "Name is required",
          minlength: "Name must be at least 3 characters long"
        },
        company: {
          required: "Company name is required"
        },
        website: {
          required: "Website URL is required",
          url: "Please enter a valid URL for the website"
        },
        description: {
          required: "Description is required"
        },
        logo: {
          required: "Logo image is required"
        },
        status: {
          required: "Status is required"
        },
        created_at: {
          required: "Created date is required",
          date: "Please enter a valid date"
        },
        updated_at: {
          required: "Updated date is required",
          date: "Please enter a valid date"
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

  loadCarousel() {
    this.carousel = new Carousel({
      id: "brands-edit",
      images: this.images
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
          this.loadCarousel();
          this.populateForm(response.data);
        }
      }
    });
  }

  populateForm(brand) {
    Object.keys(brand).forEach(key => {
      $(`#${key}`).val(brand[key]);
    });
  }

  handleFormSubmission(form) {
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();

    const formData = new FormData(form);
    formData.append("_method", "PUT");
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

    ajaxRequest.post({
      url: "/api/brands/" + $("#item-form").data("id"),
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
    Swal.fire("Brand Updated!", "Your brand has been updated.", "success").then(() => {
      $("#save-item, #cancel").hide();
      this.fetchBrand($("#item-form").data("id"));
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
