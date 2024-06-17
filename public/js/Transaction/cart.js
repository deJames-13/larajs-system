import ajaxRequest from "../assets/ajaxRequest.js";
import {
    CartItem
} from "../components/CartItem.js";


const products = [];

const checkCart = (data) => {
    $('#checkout').show();
    data && data.forEach(product => {
        product.total = product.price * product.item_quantity;
        product.quantity = product.item_quantity;
        products.push(product);
    });
    if (products.length === 0) {

        $('#cart-body').append(
            '<tr><td colspan="6" class="text-center">No items in cart</td></tr>');
        $('#cart-upd').hide();
        $('#subtotal, #total').text('0.00');
        $('#checkout').hide();

        Swal.fire({
            title: 'Cart is Empty!',
            text: "Please add items to your cart.",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
        }).then(() => {
            window.location.href = '/';
        });
    }

}

const onDelete = (id) => {
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.delete({
        url: `/api/cart/${id}`,
        onSuccess: (response) => {
            console.log(response);
            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            )
            $('#cart_item_' + id).remove();
            const subtotal = products.reduce((acc, product) => acc + product.total, 0);
            $('#subtotal, #total').text(subtotal.toFixed(2));
            checkCart(response.data);
        },
        token: token,
        onError: (response) => {
            console.log(response);
        }
    });
}

const fetchItems = () => {
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.get({
        url: '/api/cart',
        token: token,
        onSuccess: (response, status, error) => {

            var data = response.data;
            checkCart(data);
            // console.log(products);

            // RENDER CART
            products.forEach(product => {
                const cartItem = new CartItem(product);
                $('#cart-body').append(cartItem.render());

                const subtotal = products.reduce((acc, product) => acc + product
                    .total, 0);
                $('#subtotal, #total').text(subtotal.toFixed(2));
            });

        },
        onError: (response, status, error) => {
            console.log(response, status, error);
            if (status !== 'success') {
                Swal.fire({
                    title: 'Not Available!',
                    text: 'Cart is not yet available for guest. Please login to continue',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = '/login';
                });
            }
        }
    });
}

$(document).ready(function () {
    console.log('tite');

    $('#cart-upd').hide();
    fetchItems();
})

// UPDATE CART
$(document).on('click', '#cart-upd', function () {
    checkCart();
    products.forEach(product => {
        const id = product.id;
        product.quantity = $(`#item_qty_${id}`).val();
        product.total = product.quantity * product.price;
    });
    const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
    ajaxRequest.put({
        url: '/api/cart',
        data: JSON.stringify({ products: products }),
        token: token,
        settings: {
            contentType: 'application/json',
            processData: true,
        },
        onSuccess: (res) => {
            Swal.fire({
                title: 'Cart Updated!',
                text: "Your cart has been updated.",
                icon: 'success',
                confirmButtonColor: '#3085d6',
            });

            const subtotal = products.reduce((acc, product) => acc + product.total, 0);
            $('#subtotal, #total').text(subtotal.toFixed(2));
            $('#cart-upd').hide()
        },
        onError: (res) => {
            Swal.fire({
                title: 'Oops something went wrong!',
                text: "Please contact us.",
                icon: 'error',
                confirmButtonColor: '#3085d6',
            });

        }
    });



});

$(document).on('change', '.item_qty', () => $('#cart-upd').show())

// REMOVE ITEM
$(document).on('click', '.item-rm-btn', function () {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d13',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        const id = $(this).data('id');
        const product = products.find(product => product.id === id);
        const index = products.indexOf(product);
        products.splice(index, 1);

        if (result.isConfirmed) {
            onDelete(id);
        }
    })
});
