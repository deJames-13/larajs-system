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
			<div data-id="{{ $category->id }}" class="px-2 py-4 right info-container">

				{{-- Category Name --}}
				<div class="flex flex-col space-y-2">
					<h2 id="name" class="text-lg font-semibold">
						{{ $category->name }}
					</h2>
				</div>

				{{-- Category Status --}}
				<div class="flex items-center space-x-2">
					<label for="status" class="text-xs text-gray-500">Status:</label>
					<p id="status" class="text-xs text-gray-500">
						{{ $category->status }}
					</p>
				</div>

			</div>
		</div>

		<div role="tablist" class="tabs tabs-lifted">
			<input type="radio" id="description_tab" name="my_tabs" role="tab" class="tab" aria-label="Description" checked />
			<div role="tabpanel" class="p-6 tab-content bg-base-100 border-base-300 rounded-box">
				{{ $category->description }}
			</div>
		</div>
	</x-card.page>

	@push('scripts')
		<script type="module" src="{{ asset('js/Categories/read.js') }}"></script>
	@endpush
</x-layouts.default>
