<x-layouts.default :page="'search'">
	<div class="overflow-x-visible min-h-screen container mx-auto py-12 mb-12">
		<div class="logo flex items-center space-x-2">
			<img src="{{ asset('images/logo_nobg.png') }}" alt="" class="aspect-square w-24">
			<h1 class="hidden md:block text-xl uppercase lg:text-3xl font-light tracking-widest">
				SEARCH
			</h1>

			<div class="flex items-center flex-grow">
				<input type="text" class="input input-bordered rounded-none flex-grow" id="search-input-main" name="search-input">
				<button id="search-button" class="btn rounded-none aspect-square bg-primary text-white">
					<i class="fas fa-search"> </i>
				</button>
			</div>
			{{-- filters here --}}
			<select name="search-filter" id="search-filter"
				class="select select-bordered rounded-none font-bold bg-primary text-white uppercase">
				<option value="all">All</option>
				{{-- <option value="product">Product</option>
				<option value="category">Category</option>
				<option value="brand">Brand</option>
				<option value="brand">Promos</option> --}}
				{{-- <option value="customer">Customer</option>
				<option value="order">Order</option> --}}
			</select>


		</div>
		<div class="divider m-0"></div>


		<div id="search-results" class="overflow-x-visible flex flex-col gap-4 my-4 ">
			<div class="overflow-x-visible flex items-center justify-between gap-2">
				<p class="text-sm">Found results
					<span id="found-count" class="font-semibold">
						0
					</span>
					out of
					<span id="search-count" class="font-semibold">
						20
					</span>
				</p>

				<div id="paginations"></div>
			</div>

			<div id="search-contents" class="max-h-screen overflow-y-scroll flex flex-col gap-4 pt-[200px] pb-[500px] py-4">




			</div>

		</div>


	</div>



	@push('scripts')
		<script type="module">
			import SearchPage from "{{ asset('js/Search/index.js') }}";
			new SearchPage();
		</script>
	@endpush

</x-layouts.default>
