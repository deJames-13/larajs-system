
import Carousel from '../../components/Carousel.js';
import ajaxRequest from '../assets/ajaxRequest.js';
let id;
let carousel;
let item = [];

const init = () => {

    id = $('#item-form').data('id');

    // CAROUSEL
    loadCarousel(carousel);

    item = fetchItem(id);


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
                $('#save-item, #cancel').addClass('hidden');
                item = fetchItem(id);
                populateForm(item);
            }

        })
    });

    $('#item-form').submit(function (event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
        let formData = {};
        $(this).serializeArray().forEach(item => {
            formData[item.name] = item.value;
        });

        ajaxRequest.put({
            url: '/api/products/' + id,
            data: formData,
            token: token,
            onSuccess: response => handleSubmit(response.data || {}),
            onError: response => handleError(response.responseJSON.errors || {})
        });
    });

    $('#save-item').click(function () {
        $('#item-form').submit();
    });
}

const loadCarousel = (carousel) => {
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


}

const populateForm = (item) => {
    Object.keys(item).forEach(key => {
        $(`#${key}`).val(item[key]);
    });
}

const fetchItem = (id) => {
    $('.input-error').removeClass('input-error');
    $('.text-error').remove();
    ajaxRequest.get({
        url: '/api/products/' + id,
        onSuccess: (response) => {
            // console.log(response);
            if (response.data) {
                populateForm(response.data);
            }
            return response.data
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

const updateForm = (item) => {
    Swal.fire(
        'Item Updated!',
        'Your item has been updated.',
        'success'

    ).then(() => {
        $('#save-item, #cancel').addClass('hidden');
        populateForm(item);
    })
}

const handleSubmit = (item) => {
    $('.input-error').removeClass('input-error');
    $('.text-error').remove();
    updateForm(item);
}

const handleError = (errors) => {
    console.log(errors);
    Object.keys(errors).forEach(field => {
        let input = $(`#${field}`);
        input.addClass('input-error');
        input.after(
            `<p class="text-error text-sm">${errors[field]}</p>`
        );
    });
}

$(document).ready(function () {
    init();
});