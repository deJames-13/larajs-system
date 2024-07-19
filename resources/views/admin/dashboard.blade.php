<x-layouts.default :page="'dashboard'" :title="'Dashboard'">

	<div class="mx-auto container w-screen flex gap-8 flex-col sm:flex-row">

		{{-- side-bar --}}
		<div class="hidden md:block left py-8 container sm:w-24 lg:w-64">
			<div id="dashboard-sidebar" class="w-full rounded-xl shadow-xl border p-4"></div>
		</div>


		{{-- main content/pages --}}
		<div class="right flex-1 py-8 pb-48 min-h-screen max-h-[1200px] overflow-auto">
			<div id="dashboard-content" class="p-4 w-full h-full rounded-xl overflow-auto shadow-xl border pb-24"></div>
		</div>

	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Dashboard/index.js') }}"></script>
	@endpush

</x-layouts.default>
