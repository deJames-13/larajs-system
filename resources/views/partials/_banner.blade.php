@props([
    'title' => 'Banner',
    'subtitle' => '',
])

<div class="w-full py-16 flex items-center justify-center bg-secondary bg-opacity-20">
	<h1 class="font-extrabold text-2xl lg:text-5xl">
		{{ $title }}
	</h1>
</div>
