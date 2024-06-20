import ajaxRequest from '../assets/ajaxRequest.js';

let category = {
    id: parseInt($('.info-container').data('id')),
    discount: parseFloat($('#discount').data('discount')),
};

const init = () => {
    // QUANTITY COUNTER
    $('#add_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        $('#quantity_count').text(quantity + 1);
        var discount = category.discount;
        var price = calculatePrice(quantity + 1, discount);
        $('#price').text('PHP ' + price.toFixed(2));
    });

    $('#sub_qty').click(function () {
        var quantity = parseInt($('#quantity_count').text());
        if (quantity > 1) {
            $('#quantity_count').text(quantity - 1);
            var discount = category.discount;
            var price = calculatePrice(quantity - 1, discount);
            $('#price').text('PHP ' + price.toFixed(2));
        }
    });
}

const calculatePrice = (quantity, discount) => {
    // Replace the base price with actual category-specific base price logic if needed
    var basePrice = 100; // Example base price
    var totalPrice = quantity * basePrice;
    var discountAmount = totalPrice * (discount / 100);
    return totalPrice - discountAmount;
}

// POST CATEGORY TO CART
$(document).on('click', '#cart-add', function () {
    console.log('clicked');
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    var data = new FormData();
    data.append("category_id", category.id);
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
                    text: 'This category has been added to cart.',
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
                window.location.href = '/categories';
            })
            return;
        }
    });
});

$(document).ready(function () {
    init();
});
