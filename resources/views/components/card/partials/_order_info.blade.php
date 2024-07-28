{{-- Order Info --}}
<div class="info-container h-full  p-4">
	<div
		class="flex flex-col w-full h-full prose container border-2 border-black p-4 md:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">

		<div class="flex flex-wrap gap-4 justify-between items-center">
			<h2 class="m-0">Order Total</h2>
			<div class="xl:hidden text-xl font-bold">PHP <span class="total">0.00</span></div>
		</div>

		<div class="divider"></div>

		{{-- Subtotal --}}
		<div class="flex justify-between items-center">
			<h4 class="m-0">Subtotal</h4>
			<div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
		</div>

		{{-- Shipping --}}
		<div class="flex justify-between items-center">
			<h4 class="m-0"></h4>
			<div class="text-sm font-bold">
				<span id="shipping-type" class="capitalize"></span>
			</div>
		</div>

		<div class="flex justify-between items-center">
			<h4 class="m-0">Shipping</h4>
			<div class="text-sm font-bold">
				PHP <span id="shipping-cost">0.00</span>
			</div>
		</div>

		{{-- DISCOUNTS --}}
		<div style="display: none" class="flex justify-between items-center">
			<h4 class="m-0">Discount/s</h4>
			<div id="discounts" class="text-sm font-bold">
				<span class="discount-item">
					- PHP <p id="discount">0.00</p>
				</span>
			</div>
		</div>

		<div class="container mt-auto">
			<div class="divider m-0"></div>
			{{-- Grandtotal --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Grand Total</h4>
				<div class="text-sm font-bold">PHP <span class="total">0.00</span></div>
			</div>
			<div class="divider m-0"></div>
		</div>
	</div>
</div>
