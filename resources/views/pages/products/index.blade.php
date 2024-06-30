<x-layouts.default :page="'shop'">
	<div class="mx-auto p-12 min-h-screen flex flex-col space-y-4 items-center">

		{{-- PAGINATION @fixed z-[110] --}}
		<div id="paginations" class=" container mx-auto my-2 flex justify-end">
		</div>

		<div
			class="w-full max-w-[2440px] overflow-clip flex flex-col items-center space-y-0 md:space-y-0 md:space-x-2 md:flex-row">
			<div id="filters" class="md:w-1/5"></div>

			<div class="container md:w-4/5">
				{{-- ITEMS --}}
				<div id="items-container"
					class="max-w-screen min-h-screen w-full place-items-center grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
				</div>
				{{-- Message to scroll down for next page --}}
				<div id="scroll-down" class=" w-full flex justify-center items-center mt-24 mb-48">
					<div class="flex flex-col items-center">
						<div class="scroll-loader search-loader w-16"></div>
						<p class="text-lg font-bold">Scroll down for more products</p>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-bounce mt-2" fill="none" viewBox="0 0 24 24"
							stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
							</path>
						</svg>
					</div>
				</div>
				{{-- No More Products --}}
				<div id="no-more-products" style="display: none" class="w-full flex justify-center items-center mt-24 mb-48">
					<p class="text-lg font-bold">No more products</p>
				</div>
				


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
