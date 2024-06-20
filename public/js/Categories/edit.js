import ajaxRequest from '../assets/ajaxRequest.js';
import Carousel from '../components/Carousel.js';

let id;
let carousel;
let category = {};
let images = [];

const init = () => {
    id = $('#item-form').data('id');

    category = fetchCategory(id);

    $('#image-input').change(function () {
        let imagesInput = Array.from(this.files).map(file => URL.createObjectURL(file));
        images = images.concat(imagesInput);
        loadCarousel();
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
                $('#save-item, #cancel').addClass('hidden');
                category = fetchCategory(id);
            }
        });
    });

    $('#item-form').submit(function (event) {
        event.preventDefault();

        const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
        const formData = new FormData($('#item-form')[0]);
        formData.append('_method', 'PUT');

        ajaxRequest.post({
            url: '/api/categories/' + id,
            token: token,
            data: formData,
            onSuccess: response => handleSubmit(response.data || {}),
            onError: response => handleError(response.responseJSON && response.responseJSON.errors || {})
        });
    });

    $('#save-item').click(function () {
        $('#item-form').submit();
    });
};

const loadCarousel = () => {
    carousel = new Carousel('.item-carousel', images, '.prev', '.next');
};

const populateForm = (category) => {
    Object.keys(category).forEach(key => {
        $(`#${key}`).val(category[key]);
    });
};

const fetchCategory = (id) => {
    $('#image-input').val('');
    $('.input-error').removeClass('input-error');
    $('.text-error').remove();

    ajaxRequest.get({
        url: '/api/categories/' + id,
        onSuccess: (response) => {
            if (response.data) {
                images = response.data.images.map(image => '/' + image.path);
                loadCarousel();
                populateForm(response.data);
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
};

const updateForm = (data) => {
    Swal.fire(
        'Category Updated!',
        'Your category has been updated.',
        'success'
    ).then(() => {
        $('#save-item, #cancel').addClass('hidden');
        category = data;
        populateForm(data);
    });
};

const handleSubmit = (data) => {
    $('.input-error').removeClass('input-error');
    $('.text-error').remove();
    updateForm(data);
};

const handleError = (errors) => {
    console.log(errors);
    Object.keys(errors).forEach(field => {
        let input = $(`#${field}`);
        input.addClass('input-error');
        input.after(
            `<p class="text-error text-sm">${errors[field]}</p>`
        );
    });
};

$(document).ready(function () {
    init();
});
