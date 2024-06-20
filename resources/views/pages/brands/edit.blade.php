<x-layouts.default>
    <x-card.page>
        <div class="flex items-center justify-between top">
            <h1 class="text-3xl font-extrabold">Edit Brand</h1>
            <div class="flex justify-end space-x-2 actions">
                <button id="save-item" class="hidden btn btn-success">Save</button>
                <button id="cancel" class="hidden btn btn-error">Cancel</button>
                <button class="back btn btn-secondary">Back</button>
            </div>
        </div>

        <div class="divider"></div>

        <form data-id="{{ $id }}" id="item-form" enctype="multipart/form-data"
              class="container grid grid-cols-1 gap-4 border border-opacity-25 rounded-md shadow-md lg:grid-cols-2 border-secondary">
            <div class="flex flex-col space-y-2 border-r-2 border-opacity-25 left image-container border-secondary ">
                <div>
                    <x-card.carousel />
                </div>
                <div class="flex justify-center p-4 space-x-2">
                    <input id="image-input" type="file" multiple accept="image/*"
                           class="max-w-[300px] flex-grow file-input file-input-bordered file-input-primary" name="images[]">
                </div>
            </div>
            <div class="px-2 py-4 right info-container">
                <h3 class="text-2xl font-semibold border-b-2 border-opacity-25 border-primary">Brand Information</h3>
                <div class="flex flex-col space-y-4">
                    @csrf

                    {{-- Brand Name Input --}}
                    <div class="flex flex-col space-y-2">
                        <label for="name" class="text-lg font-semibold">Brand Name</label>
                        <input type="text" name="name" id="name" class="input input-bordered"
                            placeholder="Enter brand name">
                    </div>

                    {{-- Brand Company Input --}}
					<div class="flex flex-col space-y-2">
						<label for="company" class="text-lg font-semibold">Company</label>
						<input type="text" name="company" id="company" class="input input-bordered" placeholder="Enter brand company">
					</div>

					{{-- Brand Website Input--}}
					<div class="flex flex-col space-y-2">
						<label for="website" class="text-lg font-semibold">Website</label>
						<input type="text" name="website" id="website" class="input input-bordered" placeholder="Enter brand website">
					</div>

                    {{-- Brand Status Input --}}
                    <div class="flex flex-col space-y-2">
                        <label for="status" class="text-lg font-semibold">Status</label>
                        <select name="status" id="status" class="select select-bordered">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {{-- Brand Description Input --}}
                    <div class="flex flex-col space-y-2">
                        <label for="description" class="text-lg font-semibold">Description</label>
                        <textarea name="description" id="description" class="textarea textarea-bordered"
                            placeholder="Enter brand description" rows="4"></textarea>
                    </div>
                </div>
            </div>
        </form>
    </x-card.page>

    @push('scripts')
        <script type="module" src="{{ asset('js/Brands/edit.js') }}"></script>
    @endpush
</x-layouts.default>
