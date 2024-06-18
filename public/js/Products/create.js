
import ajaxRequest from '../assets/ajaxRequest.js';
import Carousel from '../components/Carousel.js';
$(document).ready(function () {

    // CAROUSEL

    let carousel;

    $('#image-input').change(function () {
        let images = Array.from(this.files).map(file => URL.createObjectURL(file));
        carousel = new Carousel('.item-carousel', images, '.prev', '.next');
    });

    $('.prev').click(function () {
        if (carousel) carousel.prev();
    });

    $('.next').click(function () {
        if (carousel) carousel.next();
    });


    $('input, textarea').on('input', function () {
        $('#save-item, #cancel').removeClass('hidden');
    });
    $('#cancel').click(function () {
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
                $('#item-form').trigger('reset');
                $('#save-item, #cancel').addClass('hidden');
            }
        })
    });

    // POST HANDLER
    $('#item-form').submit(function (event) {
        event.preventDefault();
        $('.input-error').removeClass('input-error');
        $('.text-error').remove();


        const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
        const formData = new FormData($('#item-form')[0]); // formData  object with images

        ajaxRequest.post({
            url: '/api/products',
            data: formData,
            token: token,
            onSuccess: (response) => {
                Swal.fire(
                    'Item Added!',
                    'Your item has been added to inventory.',
                    'success'

                ).then(() => {
                    window.location.href = '/admin/products';
                })
            },
            onError: (response) => {
                Object.keys(response.errors).forEach(field => {
                    let input = $(`#${field}`);
                    input.addClass('input-error');
                    input.after(
                        `<p class="text-error text-sm">${response.errors[field]}</p>`
                    );
                });
                return;
            }
        });
    });
    $('#save-item').click(function () {
        $('#item-form').submit();
    });
});