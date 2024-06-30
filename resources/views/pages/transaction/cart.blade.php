<x-layouts.default :page="'Cart'">
	<x-card.page>
		<div class="top flex flex-col lg:flex-row justify-between lg:items-center">
			<h1 class="text-3xl uppercase font-extrabold">Shopping Cart</h1>
			<div class="actions flex space-x-2 justify-end lg:items-center">
				<div>
					<button id="cart-upd" class="btn btn-primary">Update Cart</button>
				</div>
				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>
		<div class="divider"></div>
		<div class="container grid grid-cols-1 md:grid-cols-3 gap-4 ">
			<div class="left col-span-2 cart-table flex flex-col space-y-6">

				<div class="container overflow-x-auto">
					<table class="table table-xs lg:table-auto">
						<!-- head -->
						<thead>
							<tr>
								<td>
								</td>
								<th>Product</th>
								<th>Unit Price</th>
								<th>Qty</th>
								<th>Total</th>
								<th></th>
							</tr>
						</thead>
						<tbody id="cart-body">

						</tbody>


					</table>
				</div>
			</div>

			<div class="right info-container py-4 lg:px-12 ">

				<div class="container max-md border p-2 lg:p-8 rounded shadow-xl">
					{{-- Subtotal --}}
					<div class="flex justify-between items-center">
						<div class="text-sm text-gray-600">Subtotal</div>
						<div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
					</div>

					{{-- Shipping --}}
					<div class="flex justify-between items-center">
						<div class="text-sm text-gray-600">Shipping</div>
						<div class="text-sm font-bold">TBC</div>
					</div>

					{{-- Subtotal --}}
					<div class="flex justify-between items-center">
						<div class="text-sm text-gray-600">Total</div>
						<div class="text-sm font-bold">PHP <span id="total">0.00</span></div>
					</div>
					<div class="divider"></div>

					{{-- Check Out --}}
					<div class="flex justify-center">
						<a id="checkout" href="/checkout" class="btn btn-sm w-full btn-outline  btn-primary">Check Out</a>
					</div>

				</div>


			</div>

	</x-card.page>


	@push('scripts')
		<script type="module">
			import Cart from "{{ asset('js/Transaction/cart.js') }}";
			new Cart();
		</script>
	@endpush
</x-layouts.default>
