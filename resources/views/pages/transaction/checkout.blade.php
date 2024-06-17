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
		<script type="module" src="{{ asset('js/Transaction/checkout.js') }}"></script>
	@endpush
</x-layouts.default>
