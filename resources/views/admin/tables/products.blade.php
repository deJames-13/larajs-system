<x-layouts.default>
	<div class="container mx-auto px-12 py-24">
		<div class="flex flex-col space-y-4 items-center justify-center">
			<div class=" w-full print:m-0 print:overflow-visible overflow-x-auto" id="table-wrapper">

			</div>

			<div class="container flex space-x-2 justify-end align-items-center">
				<button class="btn btn-success inline-block self-end">
					<a href="{{ route('products.create') }}">Add Product</a>
				</button>
				<button class="btn  bg-primary inline-block self-end">
					<a href="{{ route('products.create') }}">Restore</a>
				</button>
			</div>
			<form method="POST" enctype="multipart/form-data" action="{{ route('imports.products') }}"
				class="flex justify-center space-x-2 my-4">
				{{ csrf_field() }}
				<input type="file" id="uploadName" name="item_upload" class="file-input file-input-sm  w-full max-w-xs" required>
				<button id="import-form-submit" type="submit" class="btn btn-info btn-sm btn-primary ">Import Excel File</button>
			</form>
		</div>
	</div>
	@push('scripts')
		<script type="module" src="{{ asset('js/Tables/products.js') }}"></script>
	@endpush

</x-layouts.default>
