<x-layouts.default :page="'Dashboard'" :title="'Dashboard'">

	<div class="container mx-auto flex space-x-2 border border-red-400 min-h-screen overflow-auto">

		{{-- side-bar --}}
		<div class="left py-8 px-4 container min-h-screen max-w-xs border border-blue-400">
			<div id="dashboard-sidebar" class="rounded-xl shadow-xl border p-4"></div>
		</div>


		{{-- main content/pages --}}
		<div class="right px-4 py-8 pb-48 container min-h-screen flex-grow border border-blue-400">
			<div id="dashboard-content" class="rounded-xl shadow-xl border p-4"></div>
		</div>

	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Dashboard/index.js') }}"></script>
	@endpush

</x-layouts.default>
