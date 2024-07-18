import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class CategoriesEdit {
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

      // Fetch category data and populate form
      this.fetchCategory(id);

      // CAROUSEL
      $("#image-input").change(() => {
        const images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.carousel = new Carousel(".item-carousel", images, ".prev", ".next");
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
          this.fetchCategory($("#item-form").data("id"));
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
        description: {
          required: true,
          minlength: 10
        },
        image: {
          required: true
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
        description: {
          required: "Description is required",
          minlength: "Description must be at least 10 characters long"
        },
        image: {
          required: "Image is required"
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

  loadCarousel() {
    this.carousel = new Carousel(".item-carousel", this.images, ".prev", ".next");
  }
  fetchCategory(id) {
    $("#image-input").val("");
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();

    ajaxRequest.get({
      url: "/api/categories/" + id,
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

  populateForm(category) {
    Object.keys(category).forEach(key => {
      $(`#${key}`).val(category[key]);
    });
  }

  handleFormSubmission(form) {
    $(".input-error").removeClass("input-error");
    $(".text-error").remove();

    const formData = new FormData(form);
    formData.append("_method", "PUT");
    const token = document.querySelector('meta[name="api-token"]').getAttribute("content");

    ajaxRequest.post({
      url: "/api/categories/" + $("#item-form").data("id"),
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
    Swal.fire("Category Updated!", "Your category has been updated.", "success").then(() => {
      $("#save-item, #cancel").hide();
      this.fetchCategory($("#item-form").data("id"));
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
