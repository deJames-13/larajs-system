
import ajaxRequest from "js/assets/ajaxRequest.js";
$(document).ready(function () {

    // TODO: STOCK
    // QUANTITY COUNTER
    $('#add_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        $('#quantity_count').text(quantity + 1);
        var price = (quantity + 1) * "{{ $item->price }}";
        $('#price').text('PHP ' + price.toFixed(2));
    });

    $('#sub_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        if (quantity > 1) {
            $('#quantity_count').text(quantity - 1);
            var price = (quantity - 1) * "{{ $item->price }}";
            $('#price').text('PHP ' + price.toFixed(2));
        }
    });

    // POST CART

});
$(document).on('click', '#cart-add', function () {
    console.log('clicked');
    var data = {
        "item_id": "{{ $item->id }}",
        "quantity": parseInt($('#quantity_count').text())
    };
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.post({
        url: '/api/cart',
        data: data,
        token: token,
        onSuccess: (response, status, xhr) => {
            if (xhr.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: xhr.getResponseHeader('message'),
                    icon: 'success',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: 'View Cart',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/cart';
                    }
                });
            }
        },
        onError: (response, status, xhr) => {
            if (xhr.status === 422) {
                Swal.fire({
                    title: 'Error',
                    text: response.errors.quantity[0],
                    icon: 'error',
                    showCancelButton: false,
                    showDenyButton: true,
                    confirmButtonText: 'Ok',
                });
            }
        }
    });
});