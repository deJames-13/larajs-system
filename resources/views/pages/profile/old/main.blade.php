<x-layouts.default :page="'profile'" :isHideHeader="true">

	{{-- @yield('banner') --}}

	<div
		class=" min-h-screen flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4  justify-center container mx-auto max-h-[900px] px-24 py-12 border border-red-400">

		<div class="min-h-screen left flex flex-col space-y-8 py-4 lg:py-8 container max-w-sm border border-red-400">

			{{-- @yield('left') --}}


		</div>
		<div id="profile-page"
			class="min-h-screen right profile-page flex flex-col space-y-8 p-4 lg:p-8 flex-grow pb-24 max-h-screen overflow-scroll border border-red-400">


			{{-- @yield('right') --}}


		</div>

	</div>
	</div>

	@push('scripts')
	@endpush

</x-layouts.default>
