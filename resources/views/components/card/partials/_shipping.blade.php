<div class="shipping-info p-4">
	<div
		class="print:hidden  prose container max-md border-2 border-black p-4 md:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">
		<h2 class="print:m-0 mb-4">Select Shipping</h2>
		<div class="relative flex flex-col md:flex-row justify-evenly gap-4 lg:gap-8">
			@foreach ($shippingOptions as $ship)
				<div data-shipping-select data-value="{{ $ship->cost }}" data-shipping="{{ $ship->name }}" data-selected="false"
					class="flex justify-between flex-grow rounded shadow-xl p-8 border hover:border-2 hover:border-primary hover:bg-primary hover:bg-opacity-20 border-opacity-50 hover:scale-105 hover:z-[5] transition-all ease-in-out active:scale-90 pointer-cursor select-none">
					<div>
						<h4 class="my-1 capitalize">{{ $ship->name }} Shipping</h4>
						<p class="my-1 italic text-sm">{{ $ship->days }} business days</p>
						<p class="my-1 font-bold"> PHP {{ $ship->cost }}.00</p>
					</div>
					<div class="flex items-end">
						<i style="display: none"
							class="check-icon fas fa-check text-primary text-2xl animate__animated animate__bounceIn"></i>
					</div>
				</div>
			@endforeach
		</div>
	</div>
</div>
