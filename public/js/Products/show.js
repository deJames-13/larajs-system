
import ajaxRequest from '../assets/ajaxRequest.js';
let item = {
    id: parseInt($('.info-container').data('id')),
    price: parseFloat($('#price').data('price')),
};

const init = () => {
    // TODO: STOCK Validation
    // QUANTITY COUNTER
    $('#add_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        $('#quantity_count').text(quantity + 1);
        var price = (quantity + 1) * item.price;
        $('#price').text('PHP ' + price.toFixed(2));
    });

    $('#sub_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        if (quantity > 1) {
            $('#quantity_count').text(quantity - 1);
            var price = (quantity - 1) * item.price;
            $('#price').text('PHP ' + price.toFixed(2));
        }
    });
}



// POST CART
$(document).on('click', '#cart-add', function () {
    console.log('clicked');
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    var data = new FormData();
    data.append("product_id", item.id);
    data.append("quantity", parseInt($('#quantity_count').text()));
    console.log(data);

    ajaxRequest.post({
        url: '/api/cart',
        data: data,
        token: token,
        onSuccess: (response) => {
            Swal.fire(
                {
                    title: 'Success',
                    text: 'This item has been added to cart.',
                    icon: 'success',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: 'View Cart'
                }
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/cart';
                }
            })
        },
        onError: (response) => {
            Swal.fire(
                'Oops!',
                'Something went wrong. Please contact us',
                'error'

            ).then(() => {
                window.location.href = '/products';
            })
            return;
        }
    });
});

$(document).ready(function () {
    init();
});