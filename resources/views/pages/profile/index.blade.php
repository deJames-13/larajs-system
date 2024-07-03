<x-layouts.default :page="'profile'">


	<div class="min-h-screen flex space-x-4 container mx-auto py-12 mb-12">

		<div id="profile-sidebar"
			class="left p-8 relative max-w-xs min-h-screen rounded-xl shadow-xl flex flex-col space-y-4 container">



		</div>
		<div id="profile-content"
			class="right min-h-screen flex-grow rounded-xl shadow-xl flex flex-col p-4 space-y-4 pb-24 overflow-scroll ">



		</div>

	</div>
	</div>

	@push('scripts')
		<script type="module" src="{{ asset('js/Profile/index.js') }}"></script>
	@endpush

</x-layouts.default>
