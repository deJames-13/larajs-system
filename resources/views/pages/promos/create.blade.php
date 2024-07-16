<x-layouts.default>
	<x-card.page>
		<div class="top flex justify-between items-center">
			<h1 class="text-3xl font-extrabold">Add Promo</h1>
			<div class="actions flex space-x-2 justify-end">
				<button id="save-item" class="hidden btn btn-success">Save</button>
				<button id="cancel" class="hidden btn btn-error">Cancel</button>
				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>

		<div class="divider"></div>

		<form id="item-form" action="" method="POST"
			class="container grid grid-cols-1 lg:grid-cols-2 gap-4 border border-secondary border-opacity-25 rounded-md shadow-md">
			<div class="left image-container flex flex-col space-y-2 border-r-2 border-secondary border-opacity-25 ">

				<div>
					<x-card.carousel />
				</div>
				<div class="flex space-x-2 p-4">
					<input id="image-input" type="file" multiple accept="image/*"
						class="flex-grow file-input file-input-bordered file-input-primary" name="images[]">
				</div>
			</div>
			<div class="right info-container py-4 px-2">

				<h3 class="text-2xl font-semibold border-b-2 border-primary border-opacity-25">
					Promo Information
				</h3>
				<div class="flex flex-col space-y-4 ">
					@csrf

					{{-- Promo Name Input --}}
					<div class="flex flex-col space-y-2">
						<label for="name" class="text-lg font-semibold">Promo Name</label>
						<input type="text" name="name" id="name" class="input input-bordered" placeholder="Enter promo name">
					</div>

					{{-- Promo Slug Input --}}
					<div class="flex flex-col space-y-2">
						<label for="slug" class="text-lg font-semibold">Slug</label>
						<textarea name="slug" id="slug" class="textarea textarea-bordered" placeholder="Enter promo slug"
						 rows="2"></textarea>
					</div>

					{{-- Promo Discount Input --}}
					<div class="flex flex-col space-y-2">
						<label for="discount" class="text-lg font-semibold">Discount (%)</label>
						<input type="number" name="discount" id="discount" class="input input-bordered"
							placeholder="Enter discount percentage">
					</div>

					{{-- Promo Start Date Input --}}
					<div class="flex flex-col space-y-2">
						<label for="start_date" class="text-lg font-semibold">Start Date</label>
						<input type="date" name="start_date" id="start_date" class="input input-bordered"
							placeholder="Enter start date">
					</div>

					{{-- Promo End Date Input --}}
					<div class="flex flex-col space-y-2">
						<label for="end_date" class="text-lg font-semibold">End Date</label>
						<input type="date" name="end_date" id="end_date" class="input input-bordered" placeholder="Enter end date">
					</div>

					{{-- Promo Status Input --}}
					<div class="flex flex-col space-y-2">
						<label for="status" class="text-lg font-semibold">Status</label>
						<select name="status" id="status" class="select select-bordered">
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>

					{{-- Promo Description Input --}}
					<div class="flex flex-col space-y-2">
						<label for="description" class="text-lg font-semibold">Description</label>
						<textarea name="description" id="description" class="textarea textarea-bordered" placeholder="Enter promo description"
						 rows="4"></textarea>
					</div>
				</div>

			</div>
		</form>
	</x-card.page>

	@push('scripts')
		<script type="module">
			import PromosCreate from "{{ asset('js/Promos/create.js') }}";
			$(document).ready(() => {
				new PromosCreate();
			});
		</script>
	@endpush
</x-layouts.default>
