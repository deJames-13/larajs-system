@props([
    'title' => 'LaraJS',
    'loading' => true,
])

<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<meta name="api-token" content="{{ session('api-token') }}">
		<title>{{ $title }}</title>


		<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
		<script src="https://cdn.tailwindcss.com"></script>

		{{-- DATATABLES --}}
		<link
			href="https://cdn.datatables.net/v/dt/jszip-3.10.1/dt-2.0.7/b-3.0.2/b-html5-3.0.2/b-print-3.0.2/date-1.5.2/r-3.0.2/sc-2.4.2/sb-1.7.1/sl-2.0.1/sr-1.4.1/datatables.min.css"
			rel="stylesheet">
		<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js"></script>
		<script
			src="https://cdn.datatables.net/v/dt/jszip-3.10.1/dt-2.0.7/b-3.0.2/b-html5-3.0.2/b-print-3.0.2/date-1.5.2/r-3.0.2/sc-2.4.2/sb-1.7.1/sl-2.0.1/sr-1.4.1/datatables.min.js">
		</script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

		{{-- jQuery plugins --}}
		<script src="{{ asset('js/assets/printThis.js') }}"></script>
		<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/additional-methods.min.js"></script>


		@vite('resources/css/app.css')

	</head>

	<body class=" relative">

		<div id="app">
			{{ $slot }}
		</div>



		{{-- Loading overlay --}}
		@if ($loading)
			<div id="loading"
				class="print:hidden z-[100] fixed top-0 w-screen h-screen grid place-content-center bg-gray-500 bg-opacity-20">
				<div class="div text-xl font-bold flex flex-col items-center justify-center">
					<h2>
						Loading...
					</h2>
					<span class="loading loading-bars loading-lg"></span>
				</div>
			</div>
		@endif




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
