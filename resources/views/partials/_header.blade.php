@props(['title' => 'GlitzVogue', 'page' => ''])

@php
	$showInPages = ['home', 'shop', 'dashboard', 'profile'];
	$isShown = isset($isShown) ? $isShown : in_array(strtolower($page), $showInPages);
	$isHideHeader = isset($isHideHeader) ? $isHideHeader : false;

	$isShown = $isShown && !$isHideHeader;
@endphp


<header class="sticky top-0 z-[69] bg-base-100 border-b">
	{{-- TOP BAR --}}@include('partials._header_top'){{-- TOP BAR --}}


	<div class="px-4 lg:px-12">

		@if ($isShown)
			{{-- SEARCH BAR --}}
			@role('admin,staff')
				@include('partials._search_bar', ['headerTitle' => $title, 'url' => route('admin.dashboard')])
			@else
				@include('partials._search_bar')
			@endrole
			{{-- SEARCH BAR --}}

			{{-- NAVIGATION --}}
			{{-- @include('partials._nav_top') --}}

			{{-- @role('admin')
				<div class="container flex items-center justify-center mx-auto space-x-8 font-bold uppercase lg:space-x-12">
					<nav class="py-2 lg:px-4">
						<a href="/admin/charts/order-per-month" class="py-2 lg:px-4 hover:text-primary">Chart 1</a>
						<a href="/admin/charts/customer-per-address" class="py-2 lg:px-4 hover:text-primary">Chart 2</a>
						<a href="/admin/charts/products-sold" class="py-2 lg:px-4 hover:text-primary">Chart 3</a>
					</nav>
				</div>
			@endrole --}}
			{{-- NAVIGATION --}}
		@endif
	</div>

</header>
