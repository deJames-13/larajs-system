<x-layouts.default :page="'Manage Order'">
	<x-card.page>

		<span id="user-role" data-role="{{ $role }}"></span>
		<span id="order-id" data-id="{{ $id }}"></span>

		<div class="top flex justify-between items-center">
			<div class="">
				<div class=" status-badge badge gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						class="inline-block w-4 h-4 stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
					<span id="status-badge" class="uppercase">Pending</span>
				</div>
				<h1 class="text-3xl uppercase font-extrabold">
					#{{ $id }}
					Order Info
				</h1>
				<p id="status-message" class="print:hidden italic text-gray-600 text-xs"></p>
			</div>

			<div class=" actions  flex space-x-2 items-center print:hidden">

				<button id="view-receipt" class="btn btn-outline btn-info">
					View Receipt
				</button>

				@role('admin,staff')
					<button id="btn-verify" class="action-button btn bg-green-400">
						Verify and Accept
					</button>
				@endrole

				<button class="back btn btn-secondary">Back</button>
			</div>
		</div>

		@include('partials._receipt')

		<div class="divider"></div>

		<x-order.info />


		{{-- Cancelling the order --}}
		@role('admin,staff')
			<div id="cancelling-form" class="print:hidden container">

				{{-- Text area --}}
				<div class="p-4 hidden">
					<label for="reason" class="block text-md font-bold text-gray-700">Reason for Cancelling</label>
					<textarea id="reason" name="reason" rows="3" class="textarea textarea-bordered w-full"></textarea>
				</div>

				<div class="text-right p-4">
					<button id="btn-cancel" class="btn bg-red-400">Cancel Order</button>
					<p id="status-message" class=" hidden italic text-gray-600 text-xs">
						Please provide a reason for cancelling this order.
					</p>
				</div>
			</div>
		@endrole


	</x-card.page>

	@push('scripts')
		<script type="module">
			import OrderShow from "{{ asset('js/Orders/show.js') }}";
			new OrderShow();
		</script>
	@endpush


</x-layouts.default>
