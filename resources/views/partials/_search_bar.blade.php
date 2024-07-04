@props(['headerTitle' => 'GlitzVogue', 'url' => '/'])

<div id="search-bar" class="px-4 lg:px-0 container mx-auto flex items-center justify-between">
	<a href="{{ $url }}" class="logo flex items-center space-x-2 cursor-pointer">
		<img src="{{ asset('images/logo_nobg.png') }}" alt="" class="aspect-square w-24">
		<h1 class="hidden md:block text-xl uppercase lg:text-3xl font-light tracking-widest">
			{{ $headerTitle }}
		</h1>
	</a>

	<div class="search flex items-center space-x-2 lg:w-1/3 max-w-lg">
		<div class="pl-4 flex items-center space-x-2 border border-gray-300 w-full">
			<div class="flex items-center space-x-2 font-bold text-md text-primary">
				<span class="w-5 search-loader"></span>
				<span>
					Search:
				</span>
			</div>
			<input id="search-input" type="text" class="flex-grow focus:outline-none focus:border-0 p-2"
				placeholder="What are you looking for? ">
			<button id="search-button" class="bg-primary text-white p-2 hover:bg-secondary active:scale-95">
				<i class="fas fa-search"></i>
			</button>
		</div>
	</div>
</div>
