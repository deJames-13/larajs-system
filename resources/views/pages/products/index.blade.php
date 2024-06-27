<x-layouts.default>
	<div class="mx-auto p-12 min-h-screen flex flex-col space-y-4 items-center">
		<div class="max-w-[2440px] overflow-clip flex flex-col items-center space-y-0 md:space-y-0 md:space-x-2 md:flex-row">
			<div id="filters" class="md:w-1/5"></div>
			<div id="items-container"
				class="max-w-screen min-h-screen md:w-4/5 flex-grow place-items-center grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
			</div>
		</div>
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
