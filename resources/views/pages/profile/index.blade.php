<x-layouts.default :page="'profile'" :isHideHeader="true">


	<div
		class=" min-h-screen flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4  justify-center container mx-auto   py-12 border border-red-400">

		<div id="profile-sidebar"
			class="min-h-screen left flex flex-col space-y-8 py-4 lg:py-8 container max-w-sm border border-red-400">



		</div>
		<div id="profile-content"
			class="min-h-screen right profile-page flex flex-col space-y-8 p-4 lg:p-8 flex-grow pb-24  overflow-scroll border border-red-400">



		</div>

	</div>
	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Profile/index.js') }}"></script>
	@endpush

</x-layouts.default>
