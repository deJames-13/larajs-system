import ajaxRequest from '../assets/ajaxRequest.js';
import Carousel from '../components/Carousel.js';

export default class ProductsEdit {
    constructor() {
        this.carousel = null;
        this.images = [
            "https://placehold.co/400x600?text=item"
        ]
        this.init();
        this.setupForm();
        this.setupValidation();
        this.id = $('#item-form').data('id');
    }

    init() {
        $(document).ready(() => {
            const id = $('#item-form').data('id');
            this.fetchItem(id);

           $('#image-input').change(() => {
                const images = Array.from($('#image-input')[0].files).map(file => URL.createObjectURL(file));
                this.carousel = new Carousel('.item-carousel', images, '.prev', '.next');
            });

            $('.prev').click(() => {
                if (this.carousel) this.carousel.prev();
            });

            $('.next').click(() => {
                if (this.carousel) this.carousel.next();
            });

            // Initially hide save and cancel buttons
            $('#save-item, #cancel').hide();

            // Show save and cancel buttons when form is changed
            $('#item-form').change(() => {
                $('#save-item, #cancel').show();
            });

        });
    }

    setupForm() {
        $('#cancel').click(() => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#save-item, #cancel').hide();
                    const id = $('#item-form').data('id');
                    this.fetchItem(id);
                }
            });
        });

        $('#save-item').click(() => {
            $('#item-form').submit();
        });
    }

    setupValidation() {
        $('#item-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                },
                sku_code: {
                    required: true,
                    minlength: 3,
                },
                description: {
                    required: true,
                    minlength: 10,
                },
                specifications: {
                    required: true,
                },
                price: {
                    required: true,
                    number: true,
                    min: 0,
                },
                stock: {
                    required: true,
                    number: true,
                    min: 0,
                },
                created_at: {
                    required: true,
                    date: true,
                },
                updated_at: {
                    required: true,
                    date: true,
                }
            },
            messages: {
                name: {
                    required: 'Name is required',
                    minlength: 'Name must be at least 3 characters long',
                },
                sku_code: {
                    required: 'SKU Code is required',
                    minlength: 'SKU Code must be at least 3 characters long',
                },
                description: {
                    required: 'Description is required',
                    minlength: 'Description must be at least 10 characters long',
                },
                specifications: {
                    required: 'Specifications are required',
                },
                price: {
                    required: 'Price is required',
                    number: 'Price must be a number',
                    min: 'Price must be at least 0',
                },
                stock: {
                    required: 'Stock is required',
                    number: 'Stock must be a number',
                    min: 'Stock must be at least 0',
                },
                created_at: {
                    required: 'Created date is required',
                    date: 'Please enter a valid date',
                },
                updated_at: {
                    required: 'Updated date is required',
                    date: 'Please enter a valid date',
                }
            },
            errorElement: 'span',
            errorPlacement: (error, element) => {
                error.addClass('text-red-400 text-sm italic my-1');
                element.addClass('border-red-400');
                error.insertAfter(element);
            },
            submitHandler: (form) => {
                this.handleFormSubmission(form);
            }
        });
    }
    loadCarousel() {
        this.carousel = new Carousel('.item-carousel', this.images, '.prev', '.next');
    }
    fetchItem(id) {
        $('#image-input').val('');
        $('.input-error').removeClass('input-error');
        $('.text-error').remove();

        ajaxRequest.get({
            url: '/api/products/' + id,
            onSuccess: (response) => {
                if (response.data) {
                    if (response.data.images && response.data.images.length > 0) {
                        this.images = response.data.images.map(image => '/' + image.path);
                    }
                    this.loadCarousel();
                    this.populateForm(response.data);
                }
            },
            onError: (error) => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        });
    }

    populateForm(item) {
        Object.keys(item).forEach(key => {
            $(`#${key}`).val(item[key]);
        });
    }

    handleFormSubmission(form) {
        $('.input-error').removeClass('input-error');
        $('.text-error').remove();

        const formData = new FormData(form);
        formData.append('_method', 'PUT');
        const token = document.querySelector('meta[name="api-token"]').getAttribute('content');

        ajaxRequest.post({
            url: '/api/products/' + this.id,
            data: formData,
            token: token,
            onSuccess: (response) => {
                Swal.fire(
                    'Item Updated!',
                    'Your item has been updated.',
                    'success'
                ).then(() => {
                    $('#save-item, #cancel').hide();
                    // window.location.href = '/admin/products';
                });
            },
            onError: (xhr) => {
                Object.keys(xhr.responseJSON.errors).forEach(field => {
                    let input = $(`#${field}`);
                    input.addClass('input-error');
                    input.after(
                        `<p class="text-error text-sm">${response.errors[field]}</p>`
                    );
                });
            }
        });
    }
}

// Initialize ProductsEdit class when document is ready
$(document).ready(() => {
    new ProductsEdit();
});
