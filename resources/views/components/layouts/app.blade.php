@props([
    'title' => 'LaraJS',
])

<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="api-token" content="{{ session('api-token') }}";>
		<title>{{ $title }}</title>

		@vite('resources/css/app.css')

	</head>

	<body class=" relative">

		<div id="app">
			{{ $slot }}
		</div>



		{{-- Loading overlay --}}

		<div id="loading"
			class="hidden print:hidden z-[100] fixed top-0 w-screen h-screen grid place-content-center bg-gray-500 bg-opacity-20">
			<div class="div text-xl font-bold flex flex-col items-center justify-center">
				<h2>
					Loading...
				</h2>
				<span class="loading loading-bars loading-lg"></span>
			</div>
		</div>




		@vite('resources/js/app.js')
		@stack('scripts')


		{{-- if session has message open Toast.js --}}
		@if (session()->has('message'))
			<script>
				import Toast from '{{ asset('js/components/Toast.js') }}'
				// if message is success
				@if (session()->has('success'))
					Toast.success('{{ session('message') }}')
				@elseif (session()->has('error'))
					Toast.error('{{ session('message') }}')
				@else
					Toast.show('{{ session('message') }}')
				@endif
			</script>
		@endif
		<script>
			$(document).on("click", '.back', function() {
				window.history.back();
			});

			// hide loading overlay
			$(document).ready(function() {
				$('#loading').hide();
			});
		</script>





	</body>

</html>
