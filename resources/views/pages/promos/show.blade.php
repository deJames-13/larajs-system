<x-layouts.default>
	<x-card.page>
		<div class="top flex justify-end items-center">
			<div class="actions flex space-x-2 justify-end">
				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>
		<div class="divider"></div>
		<div
			class="container grid grid-cols-1 lg:grid-cols-2 gap-4 border border-secondary border-opacity-25 rounded-md shadow-md">
			<div
				class="left image-container flex flex-col justify-center space-y-2 border-r-2 border-secondary border-opacity-25 ">

				<div>
					<x-card.carousel />
				</div>

			</div>
			<div data-id="{{ $promo->id }}" class="right info-container py-4 px-2">

				{{-- Promo Name --}}
				<div class="flex flex-col space-y-2">
					<h2 id="name" class="text-lg font-semibold">
						{{ $promo->name }}
					</h2>
				</div>

				{{-- Promo Status --}}
				<div class="flex items-center space-x-2">
					<label for="status" class="text-xs text-gray-500">Status:</label>
					<p id="status" class="text-xs text-gray-500">
						{{ $promo->status }}
					</p>
				</div>

				<div class="divider"></div>

				{{-- Promo Description --}}
				<div class="flex flex-col space-y-2">
					<p id="description" class="text-gray-600">
						{{ $promo->description }}
					</p>
				</div>

				<div class="divider"></div>

				{{-- Promo Discount and Validity --}}
				<div class="flex flex-col space-y-2">
					<label for="discount" class="text-xs text-gray-500">Discount</label>
					<p id="discount" class="text-lg font-semibold">
						{{ $promo->discount }}%
					</p>

					<label for="validity" class="text-xs text-gray-500">Validity</label>
					<p id="validity" class="text-md text-gray-500">
						{{ $promo->start_date }} to {{ $promo->end_date }}
					</p>
				</div>

				<div class="divider"></div>

				{{-- Promo Slug --}}
				<div class="flex flex-col space-y-2">
					<label for="slug" class="text-xs text-gray-500">Slug</label>
					<p id="slug" class="text-md text-gray-500">
						{{ $promo->slug }}
					</p>
				</div>

				{{-- Quantity and Add to Cart Button --}}
				<div class="flex justify-between items-center w-2/3">

					<div class="flex flex-col">
						<label for="quantity" class="text-xs text-gray-500">Quantity</label>
						<div name="quantity" id="quantity" class="flex flex-row items-center space-x-2">
							<button id="sub_qty" class="aspect-square w-10 flex items-center justify-center">
								<x-icons.minus></x-icons.minus>
							</button>
							<div>
								<p class="aspect-square w-10 content-center text-center font-bold text-md" id="quantity_count">
									1
								</p>
							</div>
							<button id="add_qty" class="aspect-square w-10 flex items-center justify-center">
								<x-icons.plus></x-icons.plus>
							</button>
						</div>
					</div>
				</div>

				<button id="cart-add" class="my-4 btn btn-primary text-sm uppercase">Add to Cart</button>

			</div>
		</div>

		<div role="tablist" class="tabs tabs-lifted">
			<input type="radio" id="description_tab" name="my_tabs" role="tab" class="tab" aria-label="Description"
				checked />
			<div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
				{{ $promo->description }}
			</div>
		</div>
	</x-card.page>

	@push('scripts')
		<script type="module" src="{{ asset('js/Promos/read.js') }}"></script>
	@endpush
</x-layouts.default>
