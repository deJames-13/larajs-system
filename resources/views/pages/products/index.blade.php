<x-layouts.default :page="'shop'">
	<div class="mx-auto p-12 min-h-screen flex flex-col space-y-4 items-center">

		{{-- PAGINATION @fixed z-[110] --}}
		<div id="paginations" class=" container mx-auto my-2 flex justify-end">
		</div>

		<div
			class="w-full max-w-[2440px] overflow-clip flex flex-col items-center space-y-0 md:space-y-0 md:space-x-2 md:flex-row">
			<div id="filters" class="md:w-1/5"></div>

			{{-- ITEMS --}}
			<div id="items-container"
				class="max-w-screen min-h-screen md:w-3/5 flex-grow place-items-center grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 pb-72 border border-red-400">
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
