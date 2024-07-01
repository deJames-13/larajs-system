<x-layouts.default>
	<div id="brands-page" class="container px-12 py-24 mx-auto">
		<div class="flex flex-col items-center justify-center space-y-4">
			<div class="w-full overflow-x-auto print:m-0 print:overflow-visible" id="table-wrapper">
				<!-- DataTable will be rendered here -->
			</div>

			<div class="container flex justify-end space-x-2 align-items-center">
				<button class="btn text-white btn-success inline-block self-end">
					<a href="{{ route('brands.create') }}">Add Product</a>
				</button>
				<button class="btn text-white bg-primary inline-block self-end">
					<a href="{{ route('brands.create') }}">Restore</a>
				</button>
			</div>

			<form method="POST" enctype="multipart/form-data" action="{{ route('imports.brands') }}"
				class="flex justify-center my-4 space-x-2">
				@csrf
				<input type="file" id="uploadName" name="item_upload" class="w-full max-w-xs file-input file-input-sm" required>
				<button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary">Import Excel File</button>
			</form>
		</div>
	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Tables/brands.js') }}"></script>
		<script type="module">
			import BrandsPage from "{{ asset('js/Tables/brands.js') }}";
			BrandsPage.init({
				target: "#brands-page"
			});
		</script>
	@endpush
</x-layouts.default>
