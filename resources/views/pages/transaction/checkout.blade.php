<x-layouts.default :page="'Cart'">
	<x-card.page>
		<div class="top flex justify-between items-center">
			<h1 class="text-3xl uppercase font-extrabold">Check Out</h1>
			<div class="actions flex space-x-2 items-center">

				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>

		<div class="divider"></div>

		<x-order.info />

	</x-card.page>




	@push('scripts')
		<script type="module">
			import {
				OrderItem
			} from "{{ asset('js/components/OrderItem.js') }}";
			import ajaxRequest from "{{ asset('js/assets/ajaxRequest.js') }}";

			const products = [];



			const checkout = (payload) => {
				// clear errors
				$('input').removeClass('border-red-400 border-2');
				$('.address-field').addClass('hidden');
				const token = document.querySelector('meta[name="api-token"]').getAttribute('content')

				ajaxRequest.post({
					url: '/api/orders/checkout',
					data: payload,
					token: token,
					onSuccess: (res, status, error) => {
						Swal.fire({
							title: 'Order Placed!',
							text: 'Your order has been placed successfully.',
							icon: 'success',
							showCancelButton: false,
							confirmButtonColor: '#3085d6',
							confirmButtonText: 'OK'
						}).then((result) => {
							if (result.isConfirmed) {
								window.location.href = '/orders';
							}
						});
					},
					onError: (res, status, error) => {
						console.log({
							res,
							status,
							error
						});
						if (res.status === 422) {
							const errors = res.responseJSON.errors;
							Object.keys(errors).forEach(key => {
								let field = `${key}`.split('.')[1];
								$(`input[name=${field}]`).addClass('border-red-400 border-2');
								$(`#${key}-error`).text(errors[key][0]);
							});
						}
					},
				});

			}




			$(document).ready(function() {

				// GET CART
				const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
				ajaxRequest.get({
					url: '/api/cart',
					token: token,
					onSuccess: ({
						data
					}) => {
						data.forEach(product => {
							product.total = product.price * product.quantity;
							products.push(product);
						});

						if (products.length === 0) {
							window.location.href = '/';
						}

						// console.log(products);
						// RENDER CART
						products.forEach(product => {
							// if no product in cart redirect to shop
							if (products.length === 0) {
								window.location.href = '{{ route('home') }}';
							}

							const cartItem = new OrderItem(product);
							$('#cart-body').append(cartItem.render());

							const subtotal = products.reduce((acc, product) => acc + product.total, 0);
							$('#subtotal, #total').text(subtotal.toFixed(2));
						});
						$('#form-submit').show();



					},
				});


				$('#billing-form').on('submit', function(e) {
					e.preventDefault();
					const addressInfo = Object.values(address).map(value => value ? value : 'N/A').join(', ');
					formData.address = addressInfo;

					const payload = {
						shipping_address: address,
						items: products.map(product => ({
							id: product.id,
							quantity: product.quantity
						})),
						customer_info: formData
					}

					// Confirm
					Swal.fire({
						title: 'Place Order.',
						text: "Are you sure you want to place this order?",
						icon: 'info',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, proceed!'
					}).then((result) => {
						if (result.isConfirmed) {
							checkout(payload);
						}
					});

				});




			})
		</script>
	@endpush
</x-layouts.default>
