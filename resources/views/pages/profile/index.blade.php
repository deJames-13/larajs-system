<x-layouts.default :page="'profile'" :isHideHeader="true">


	<div
		class="min-h-screen flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4  justify-center container mx-auto py-12  mb-12">

		<div id="profile-sidebar"
			class="relative min-h-screen left border-2 border-primary rounded-xl shadow-xl flex flex-col space-y-4 container max-w-sm ">



		</div>
		<div id="profile-content"
			class="min-h-screen right border rounded-xl shadow-xl flex flex-col p-4 space-y-4 flex-grow pb-24  overflow-scroll ">



		</div>

	</div>
	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Profile/index.js') }}"></script>
	@endpush

</x-layouts.default>
