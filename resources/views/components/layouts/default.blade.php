@props([
    'title' => 'GlitzVogue',
    'page' => '',
    'loading' => true,
    'isHideHeader' => false,
])

<x-layouts.app :title="$title" :page="$page" :loading="$loading">

	@include('partials._header')
	<div class="px-4 lg:px-12">
		{{ $slot }}

	</div>

</x-layouts.app>
