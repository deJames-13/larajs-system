<x-layouts.default :page="'shop'">
	<div class="mx-auto p-12 min-h-screen flex flex-col space-y-4">
		<div>
			<h1 class="text-2xl font-bold">Promos</h1>
		</div>
		<div id="promos-container" class="place-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"></div>
	</div>

	@push('scripts')
		<script type="module">
			import Promos from "{{ asset('js/Promos/index.js') }}";
			new Promos({
				parent: '#promos-container',
				url: "{{ route('promos.index') }}"
			});
		</script>
	@endpush
</x-layouts.default>
