<x-layouts.default>
	<div class="mx-auto p-12 min-h-screen flex flex-col space-y-4">
		<div>
			<h1 class="text-2xl font-bold">Products</h1>
		</div>
		<div id="items-container" class="place-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"></div>
	</div>


	@push('scripts')
		<script type="module">
			import Products from "{{ asset('js/Products/index.js') }}";
			new Products({
				parent: '#items-container',
				url: "{{ route('products.all') }}"
			});
		</script>
	@endpush

</x-layouts.default>
