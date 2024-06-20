<x-layouts.default>
	<x-card.page>
		<div class="flex items-center justify-end top">
			<div class="flex justify-end space-x-2 actions">
				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>
		<div class="divider"></div>
		<div
			class="container grid grid-cols-1 gap-4 border border-opacity-25 rounded-md shadow-md lg:grid-cols-2 border-secondary">
			<div
				class="flex flex-col justify-center space-y-2 border-r-2 border-opacity-25 left image-container border-secondary ">

				<div>
					<x-card.carousel />
				</div>

			</div>
			<div data-id="{{ $brand->id }}" class="px-2 py-4 right info-container">

				{{-- Brand Name --}}
				<div class="flex flex-col space-y-2">
					<h2 id="name" class="text-lg font-semibold">
						{{ $brand->name }}
					</h2>
				</div>

				{{-- Brand Status --}}
				<div class="flex items-center space-x-2">
					<label for="status" class="text-xs text-gray-500">Status:</label>
					<p id="status" class="text-xs text-gray-500">
						{{ $brand->status }}
					</p>
				</div>

				<div class="divider"></div>

				{{-- Brand Company --}}
				<div class="flex flex-col space-y-2">
					<p id="company" class="text-gray-600">
						{{ $brand->company }}
					</p>
				</div>

				<div class="divider"></div>

                {{-- Brand Website --}}
				<div class="flex flex-col space-y-2">
					<p id="website" class="text-gray-600">
						{{ $brand->website }}
					</p>
				</div>

			</div>
		</div>

		<div role="tablist" class="tabs tabs-lifted">
			<input type="radio" id="description_tab" name="my_tabs" role="tab" class="tab" aria-label="Description" checked />
			<div role="tabpanel" class="p-6 tab-content bg-base-100 border-base-300 rounded-box">
				{{ $brand->description }}
			</div>
		</div>
	</x-card.page>

	@push('scripts')
		<script type="module" src="{{ asset('js/Brands/read.js') }}"></script>
	@endpush
</x-layouts.default>
