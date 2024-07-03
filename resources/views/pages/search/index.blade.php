<x-layouts.default :page="'search'">
	<div class="min-h-screen container mx-auto py-12 mb-12">
		<div class="logo flex items-center space-x-2">
			<img src="{{ asset('images/logo_nobg.png') }}" alt="" class="aspect-square w-24">
			<h1 class="hidden md:block text-xl uppercase lg:text-3xl font-light tracking-widest">
				SEARCH
			</h1>

			<input type="text" class="input input-bordered rounded-none w-2/3" id="search-input" name="search-input">
			{{-- filters here --}}
			<select name="search-filter" id="search-filter"
				class="select select-bordered rounded-none font-bold bg-primary text-white uppercase">
				<option value="all">All</option>
				<option value="product">Product</option>
				<option value="category">Category</option>
				<option value="brand">Brand</option>
				<option value="brand">Promos</option>
				{{-- <option value="customer">Customer</option>
				<option value="order">Order</option> --}}
			</select>


		</div>
		<div class="divider m-0"></div>


		<div id="search-results" class="flex flex-col gap-4 my-4">
			<div class="flex items-center justify-between gap-2">
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

			<div id="search-contents" class="flex flex-col gap-4 border border-red-400 py-4">




			</div>

		</div>


	</div>



	@push('scripts')
		<script type="module" src="{{ asset('js/Search/index.js') }}"></script>
	@endpush

</x-layouts.default>
