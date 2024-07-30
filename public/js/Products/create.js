import ajaxRequest from "../assets/ajaxRequest.js";
import Carousel from "../components/Carousel.js";

export default class ProductsCreate {
  constructor() {
    this.carousel = null;
    this.images = ["https://placehold.co/400x600?text=item"];
    this.init();
    this.setupForm();
    this.setupValidation();
  }

  init() {
    $(document).ready(() => {
      $("#image-input").change(() => {
        this.images = Array.from($("#image-input")[0].files).map(file => URL.createObjectURL(file));
        this.carousel = new Carousel({
          id: "products-create",
          images: this.images
        });
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
          $("#item-form").trigger("reset");
          $("#save-item, #cancel").hide();
          $("input").removeClass("border-red-400");
          $("#item-form").validate().resetForm();
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
        sku_code: {
          required: true,
          pattern:  /^(?!-)[A-Z0-9-]*(?<!-)$/
        },
        description: {
          required: true,
          minlength: 10
        },
        specifications: {
          required: true
        },
        price: {
          required: true,
          number: true,
          min: 0
        },
        stock: {
          required: true,
          number: true,
          min: 0
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
          pattern: "Please enter a valid name: Capitalize the first letter"
        },
        sku_code: {
          required: "SKU code is required",
          pattern: "Please enter a valid SKU code: It should only contain uppercase letters, digits, and hyphens SKU code cannot start or end with a hyphen"
        },
        description: {
          required: "Description is required",
          minlength: "Description must be at least 10 characters long"
        },
        specifications: {
          required: "Specifications are required"
        },
        price: {
          required: "Price is required",
          number: "Price must be a number",
          min: "Price must be at least 0"
        },
        stock: {
          required: "Stock is required",
          number: "Stock must be a number",
          min: "Stock must be at least 0"
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
      url: "/api/products",
      data: formData,
      token: token,
      onSuccess: response => {
        Swal.fire("Item Added!", "Your item has been added to inventory.", "success").then(() => {
          window.location.href = "/dashboard?nav=products";
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
