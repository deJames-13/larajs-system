<x-layouts.default :page="'profile'" :isHideHeader="true">

	@yield('banner')

	<div
		class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8  justify-center container mx-auto max-h-[900px] px-24 py-12 ">
		<div class="left flex flex-col space-y-8 py-4 lg:py-8 container max-w-sm">

			@yield('left')


		</div>
		<div id="profile-page"
			class="right profile-page flex flex-col space-y-8 p-4 lg:p-8 flex-grow pb-24 max-h-screen overflow-scroll">


			@yield('right')


		</div>

	</div>
	</div>


</x-layouts.default>
