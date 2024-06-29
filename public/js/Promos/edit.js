import ajaxRequest from '../assets/ajaxRequest.js';
import Carousel from '../components/Carousel.js';

export default class PromosEdit {
    constructor() {
        this.id = null;
        this.carousel = null;
        this.promo = {};
        this.images = [
            "https://placehold.co/400x600?text=item"
        ]

        this.init();
        this.validate();
    }

    init() {
        this.id = $('#item-form').data('id');

        this.promo = this.fetchPromo(this.id);

        $('#image-input').change(() => {
            const imagesInput = Array.from($('#image-input')[0].files).map(file => URL.createObjectURL(file));
            this.images = this.images.concat(imagesInput);
            this.loadCarousel();
        });

        $('.prev').click(() => {
            if (this.carousel) this.carousel.prev();
        });

        $('.next').click(() => {
            if (this.carousel) this.carousel.next();
        });

        // Initially hide save and cancel buttons
        $('#save-item, #cancel').hide();

        // On form change, show save and cancel buttons
        $('#item-form').change(() => {
            $('#save-item, #cancel').show();
        });


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
                    this.promo = this.fetchPromo(this.id);
                }
            });
        });

        $('#item-form').submit((event) => {
            event.preventDefault();

            const token = $('meta[name="api-token"]').attr('content');
            const formData = new FormData($('#item-form')[0]);
            formData.append('_method', 'PUT');

            ajaxRequest.post({
                url: '/api/promos/' + this.id,
                token: token,
                data: formData,
                onSuccess: (response) => this.handleSubmit(response.data || {}),
                onError: (response) => this.handleError(response.responseJSON && response.responseJSON.errors || {})
            });
        });

        $('#save-item').click(() => {
            $('#item-form').submit();
        });
    }

    loadCarousel() {
        this.carousel = new Carousel('.item-carousel', this.images, '.prev', '.next');
    }

    populateForm(promo) {
        Object.keys(promo).forEach((key) => {
            $(`#${key}`).val(promo[key]);
            // if input is date, format it
            if (key.includes('date')) {
                $(`#${key}`).val(new Date(promo[key]).toISOString().split('T')[0]);
            }
        });
    }

    fetchPromo(id) {
        $('#image-input').val('');
        $('.input-error').removeClass('input-error');
        $('.text-error').remove();

        ajaxRequest.get({
            url: '/api/promos/' + id,
            onSuccess: (response) => {
                if (response.data) {
                    if (response.data.images && response.data.images.length > 0) {
                        this.images = response.data.images.map(image => '/' + image.path);
                    }
                    this.loadCarousel();
                    this.populateForm(response.data);
                    return response.data;
                }
                return {};
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

    updateForm(data) {
        Swal.fire(
            'Promo Updated!',
            'Your promo has been updated.',
            'success'
        ).then(() => {
            $('#save-item, #cancel').hide();
            this.promo = data;
            this.populateForm(data);
        });
    }

    handleSubmit(data) {
        $('.input-error').removeClass('input-error');
        $('.text-error').remove();
        this.updateForm(data);
    }

    handleError(errors) {
        console.log(errors);
        Object.keys(errors).forEach(field => {
            let input = $(`#${field}`);
            input.addClass('input-error');
            input.after(
                `<p class="text-error text-sm">${errors[field]}</p>`
            );
        });
    }

    validate() {
        $('#item-form').validate({
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
                    required: 'Please enter a name',
                    minlength: 'Name must be at least 2 characters',
                    maxlength: 'Name must not exceed 255 characters'
                },
                slug: {
                    required: 'Please enter a slug',
                    minlength: 'Slug must be at least 2 characters',
                    maxlength: 'Slug must not exceed 100 characters'
                },
                description: {
                    required: 'Please enter a description',
                    maxlength: 'Description must not exceed 500 characters'
                },
                image: {
                    required: 'Please select an image'
                },
                status: {
                    required: 'Please select a status'
                },
                discount: {
                    required: 'Please enter a discount',
                    number: 'Discount must be a number',
                    min: 'Discount must be at least 0',
                    max: 'Discount must be at most 100'
                },
                start_date: {
                    required: 'Please select a start date',
                    date: 'Please enter a valid date'
                },
                end_date: {
                    required: 'Please select an end date',
                    date: 'Please enter a valid date'
                }
                // Add more messages as necessary
            },
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('text-red-400 text-sm italic my-1');
                element.addClass('border-red-400');
                error.insertAfter(element);
            },
        });
    }
}

// Initialize PromoEdit class when document is ready
$(document).ready(() => {
    new PromosEdit();
});
