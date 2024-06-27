@props(['title' => 'GlitzVogue', 'page' => ''])

@php
	$exlcudeFromPages = ['login', 'register', 'cart', 'checkout', 'orders'];
	$isShown = !in_array(strtolower($page), $exlcudeFromPages);
@endphp


<header class="sticky top-0 z-[100] bg-base-100 border-b">
	{{-- TOP BAR --}}@include('partials._header_top'){{-- TOP BAR --}}


	@if ($isShown)
		{{-- SEARCH BAR --}} @include('partials._search_bar') {{-- SEARCH BAR --}}
		{{-- NAVIGATION --}} @include('partials._nav_top') {{-- NAVIGATION --}}
	@endif



	@push('scripts')
		@guest
			<script type="module" src="{{ asset('js/Auth/index.js') }}"></script>
		@endguest
		<script type="text/javascript">
			$(document).ready(function() {
				$(window).scroll(function() {
					var currentScroll = $(this).scrollTop();

					if (currentScroll > 0) {
						$('#search-bar').slideUp();
					} else {
						$('#search-bar').slideDown();
					}
				});
			})
		</script>
		<script type="module" src="{{ asset('js/scripts/header.js') }}"></script>
	@endpush

</header>
