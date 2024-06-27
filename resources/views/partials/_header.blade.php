@props(['title' => 'GlitzVogue', 'page' => ''])
<header class="sticky top-0 z-[100] bg-base-100 border-b">
	{{-- TOP BAR --}}@include('partials._header_top'){{-- TOP BAR --}}

	{{-- SEARCH BAR --}}@include('partials._search_bar'){{-- SEARCH BAR --}}

	{{-- NAVIGATION --}}@include('partials._nav_top'){{-- NAVIGATION --}}


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
	@endpush

</header>
