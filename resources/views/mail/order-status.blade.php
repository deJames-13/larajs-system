@php

	// $status = $status ?? '';
	// $orderId = $orderId ?? '';
	// $status = $status ?? '';
	// $fullname = $fullname ?? '';
	// $subtotal = $subtotal ?? '';
	// $total = $total ?? '';
	$message = '';

	switch ($status) {
	    case 'processing':
	        $message = "
	            Our dear customer, we would like to inform you that your order has been approved. It is now being <strong>processed</strong> by our staff and is being prepared for shipping.
	                    
	            <br>
	            <span class=\"text-sm italic\">
	                Please kindly wait for further information about your order. Rest assured we will deliver your parcel within the
	                date of shipping. We thank you for your patience.
	            </span>
            ";
	        break;
	    case 'shipping':
	        $message = "
	            Our dear customer, we would like to inform you that your order has finished processing. It is now being <strong>shipped</strong>.Please provide a payment once the order is delivered.
	        ";
	        break;
	    case 'completed':
	        $message = "
	            Thank you for shopping with us! Your order has been <strong>completed</strong>. We hope you are satisfied with our service. Please do not hesitate to contact us if you have any concerns or inquiries.
	        ";
	        break;

	    default:
	        break;
	}

@endphp

<x-layouts.app :loading='false'>
	<header
		class="bg-gray-400 bg-opacity-35 py-12 flex flex-col space-y-4 justify-center items-center border-b border-primary">
		<div class="prose text-center">
			<h4>GlitzVogue</h4>
			<h1>Order Status</h1>
		</div>
	</header>

	<div class="container mx-auto">
		<div class="lg:p-12 py-8 px-2">


			<div class="divider"></div>
			<div
				class="flex justify-center info-container py-4 lg:px-12 max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">
				<div class="_skeleton prose w-full m-0 p-0">

					<div class=" status-badge badge bg-blue-400 gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							class="inline-block w-4 h-4 stroke-current">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
						<span id="status-badge" class="uppercase">
							{{ $status }}
						</span>
					</div>

					<h3 class="text-lg font-bold">Good day! <span
							class="text-primary font-extrabold">{{ $fullname ?? 'johndoe' }}</span>
					</h3>

					<div class="font-light text-sm">
						<p>
							{!! $message !!}
						</p>
					</div>
					@include('partials._receipt', ['print' => false])

					<h2 class="print:m-0">Order Total</h2>
					{{-- Total Sales --}}
					<div class="flex justify-between items-center">
						<h4 class="m-0">Total Sales</h4>
						<div class="text-sm font-bold">PHP <span id="subtotal">{{ $subtotal }}</span></div>
					</div>
					<div class="divider"></div>
					{{-- Subtotal --}}
					<div class="flex justify-between items-center">
						<h4 class="m-0">Subtotal</h4>
						<div class="text-sm font-bold">PHP <span id="subtotal">{{ $subtotal }}</span></div>
					</div>

					{{-- Shipping --}}
					<div class="flex justify-between items-center">
						<h4 class="m-0">Shipping</h4>
						<div class="text-sm font-bold">TBC</div>
					</div>

					{{-- Grandtotal --}}
					<div class="flex justify-between items-center">
						<h4 class="m-0">Grand Total</h4>
						<div class="text-sm font-bold">PHP <span id="total">{{ $total }}</span></div>
					</div>
					<div class="divider m-0"></div>


				</div>
			</div>

		</div>




	</div>


</x-layouts.app>
