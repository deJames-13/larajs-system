@props([
    'print' => true,
    'order' => [
        'id' => 'N/A',
        'full_name' => 'N/A',
        'shipping_address' => 'N/A',
        'payment_method' => 'N/A',
        'created_at' => 'N/A',
        'paid_date' => 'N/A',
    ],
])

<div class="{{ $print ? 'hidden' : '' }} print:block  container mx-auto m-0">

	<div class="container flex flex-col">
		<h2 class="text-gray-600 m-0">Order Summary</h2>
		<div class="divider m-0"></div>
		<div class="flex justify-between space-x-8 text-xs">
			<div class="w-full text-nowrap text-left">
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Shop Name:</h4>
					<p class="m-0">GlitzVogue</p>
				</div>
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Shop Address:</h4>
					<p class="m-0 text-wrap">123 Rd, Western Bicutan, Taguig City Metro Manila</p>
				</div>
			</div>
			<div class="w-full text-nowrap text-right">
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Date Issued:</h4>
					<p class="m-0"><span id='rcpt_date_issued'>{{ $order->created_at ?? '' }}</span></p>
				</div>
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Order ID:</h4>
					<p class="m-0">
						<span id='rcpt_order_id'>{{ $order->id ?? '' }}</span>
					</p>
				</div>
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Order Paid Date:</h4>
					<p class="m-0">
						<span id='rcpt_order_paiddate'>{{ $paidDate ?? 'N/A' }}</span>
					</p>
				</div>
				<div class="flex space-x-4 items-center">
					<h4 class="font-bold m-0">Payment Method:</h4>
					<p class="m-0">
						<span id='rcpt_order_method'>{{ $order->payment_method ?? 'Cash on Delivery' }}</span>
					</p>
				</div>
			</div>
		</div>
		<div>
			<div class="flex space-x-4 items-center">
				<h4 class="font-bold m-0">Buyer Name:</h4>
				<p class="m-0"><span id='rcpt_full_name'>{{ $order->full_name ?? '' }}</span></p>
			</div>
			<div class="flex space-x-4 items-center">
				<h4 class="font-bold m-0">Buyer Address:</h4>
				<p class="m-0"><span id='rcpt_address'>{{ $order->shipping_address ?? '' }}</span></p>
			</div>
		</div>

	</div>
</div>
