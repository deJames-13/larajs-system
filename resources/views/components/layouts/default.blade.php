@props([
    'title' => 'GlitzVogue',
    'page' => '',
    'loading' => false,
    'isHideHeader' => false,
])

<x-layouts.app :title="$title" :page="$page" :loading="$loading">

	@include('partials._header')

	{{ $slot }}

</x-layouts.app>
