<x-layouts.default>
	<x-card.page>

		<div class="top flex justify-between items-center">
			<h1 class="text-3xl font-extrabold">
				Edit Item
			</h1>
			<div class="actions flex space-x-2 justify-end">
				<button id="save-item" class="hidden btn btn-success">Save</button>
				<button id="cancel" class="hidden btn btn-error">Cancel</button>
				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>

		<div class="divider"></div>

		<form data-id="{{ $id }}" id="item-form" enctype="multipart/form-data"
			class="container grid grid-cols-1 lg:grid-cols-2 gap-4 border border-secondary border-opacity-25 rounded-md shadow-md">
			<div class="left image-container flex flex-col space-y-2 border-r-2 border-secondary border-opacity-25 ">

				<div>
					<x-card.carousel />
				</div>
				<div class="flex space-x-2 p-4 justify-center">
					<input id="image-input" type="file" multiple accept="image/*"
						class="max-w-[300px] flex-grow file-input file-input-bordered file-input-primary" name="images[]">
				</div>
			</div>
			<div class="right info-container py-4 px- mb-24">

				<h3 class="text-2xl font-semibold border-b-2 border-primary border-opacity-25">
					Product Information
				</h3>
				<div class="flex flex-col space-y-4 ">
					@csrf


					{{-- Item Name Input --}}
					<div class="flex flex-col space-y-2">
						<label for="name" class="text-lg font-semibold">Item Name</label>
						<input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter item name">
					</div>

					{{-- Item Price Input --}}
					<div class="flex flex-col space-y-2">
						<label for="price" class="text-lg font-semibold">Price</label>
						<input type="number" name="price" id="price" class="input input-bordered" placeholder="Enter item price">
					</div>
					{{-- Item Stock Input --}}
					<div class="flex flex-col space-y-2">
						<label for="stock" class="text-lg font-semibold">Stock</label>
						<input type="number" name="stock" id="stock" class="input input-bordered" placeholder="Enter item stock">
					</div>

					{{-- Item SKU Code Input --}}
					<div class="flex flex-col space-y-2">
						<label for="sku_code" class="text-lg font-semibold">SKU Code</label>
						<input type="text" name="sku_code" id="sku_code" class="input input-bordered"
							placeholder="Enter stock keeping unit code">
					</div>

					{{-- Item Description Input --}}
					<div class="flex flex-col space-y-2">
						<label for="description" class="text-lg font-semibold">Description</label>
						<textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter item description"
						 rows="4"></textarea>
					</div>
					{{-- Item Specifications Input --}}
					<div class="flex flex-col space-y-2">
						<label for="specifications" class="text-lg font-semibold">Specifications</label>
						<textarea name="specifications" id="specifications" class="textarea textarea-bordered"
						 placeholder="Enter item specifications" rows="4"></textarea>
					</div>

					{{-- Item Status Input --}}
					<div class="flex flex-col space-y-2">
						<label for="status" class="text-lg font-semibold">Status</label>
						<select name="status" id="status" class="select select-bordered">
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>

				</div>

			</div>
		</form>

	</x-card.page>


	@push('scripts')
		<script type="module">
			import ProductsEdit from "{{ asset('js/Products/edit.js') }}"
			// Initialize ProductsEdit class when document is ready
			$(document).ready(() => {
				new ProductsEdit();
			});
		</script>
	@endpush
</x-layouts.default>
