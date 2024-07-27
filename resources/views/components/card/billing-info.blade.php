@php
	$user = $user ?? auth()->user();
	$info =
	    $user->info ??
	    (object) [
	        'first_name' => '',
	        'last_name' => '',
	        'phone_number' => '',
	        'zip_code' => '',
	    ];
@endphp
<form id="billing-form">
	@csrf
	{{-- Shipping --}}
	<input type="hidden" id="shipping_type" name="shipping_type" value="Standard">
	<input type="hidden" id="shipping_cost" name="shipping_cost" value="80">

	<div class="info-container p-4">
		<div
			class="print:hidden _skeleton prose container max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">
			<h2 class="print:m-0 mb-4">Select Shipping</h2>
			<div class="relative flex flex-col md:flex-row justify-evenly gap-4 lg:gap-8">
				{{-- Standard 3-5 days --}}
				<div data-shipping-select data-value="50" data-shipping="standard" data-selected="false"
					class="flex justify-between flex-grow rounded shadow-xl p-8 border hover:border-2 hover:border-primary hover:bg-primary hover:bg-opacity-20 border-opacity-50 hover:scale-105 hover:z-[5] transition-all ease-in-out active:scale-90 pointer-cursor select-none">
					<div>
						<h4 class="my-1">Standard Shipping</h4>
						<p class="my-1 italic text-sm">3-5 business days</p>
						<p class="my-1 font-bold"> PHP 50.00</p>
					</div>
					<i style="display: none"
						class="check-icon fas fa-check text-primary text-2xl animate__animated animate__bounceIn"></i>
				</div>
				{{-- Express 2-3 days  --}}
				<div data-shipping-select data-value="80" data-shipping="express" data-selected="false"
					class="flex justify-between flex-grow rounded shadow-xl p-8 border hover:border-2 hover:border-primary hover:bg-primary hover:bg-opacity-20 border-opacity-50 hover:scale-105 hover:z-[5] transition-all ease-in-out active:scale-90 pointer-cursor select-none">
					<div>
						<h4 class="my-1">Express Shipping</h4>
						<p class="my-1 italic text-sm">2-3 business days</p>
						<p class="my-1 font-bold"> PHP 80.00</p>
					</div>
					<i style="display: none"
						class="check-icon fas fa-check text-primary text-2xl animate__animated animate__bounceIn"></i>
				</div>
				{{-- Priority 1-2 days  --}}
				<div data-shipping-select data-value="150" data-shipping="priority" data-selected="false"
					class="flex justify-between flex-grow rounded shadow-xl p-8 border hover:border-2 hover:border-primary hover:bg-primary hover:bg-opacity-20 border-opacity-50 hover:scale-105 hover:z-[5] transition-all ease-in-out active:scale-90 pointer-cursor select-none">
					<div>
						<h4 class="my-1">Priority Shipping</h4>
						<p class="my-1 italic text-sm">1-2 business days</p>
						<p class="my-1 font-bold">PHP 150.00</p>
					</div>
					<i style="display: none"
						class="check-icon fas fa-check text-primary text-2xl animate__animated animate__bounceIn"></i>
				</div>
			</div>


		</div>
	</div>

	{{-- Order Info --}}
	<div class="info-container p-4">
		<div
			class="_skeleton prose container max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">

			<div class="flex justify-between items-center">
				<h2 class="m-0">Order Total</h2>
				<div class="text-xl font-bold">PHP <span class="total">0.00</span></div>
			</div>
			{{-- Total Sales --}}
			{{-- <div class="flex justify-between items-center">
				<h4 class="m-0">Total Sales</h4>
				<div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
			</div> --}}
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

			<div class="divider m-0"></div>

			{{-- Grandtotal --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Grand Total</h4>
				<div class="text-sm font-bold">PHP <span class="total">0.00</span></div>
			</div>
			<div class="divider m-0"></div>


		</div>
	</div>


	{{-- Billing Address --}}

	<div class="_skeleton container p-4 print:hidden">
		<div class="prose container max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl">
			<h4>Billing Address</h4>
			<p>If you plan to pay via credit card, be sure to use the same billing address details as that of your credit card
				account to better ensure authorization of your purchase.</p>

			<div class="flex flex-col gap-4 mb-8">
				{{-- first name, last name --}}
				<div class="flex flex-wrap items-end">
					<div class="w-full md:w-1/2 px-2">
						<label for="first_name">First Name*</label>
						<input id="first_name" name="first_name" class="input input-bordered w-full" value="{{ $info->first_name }}" />
					</div>
					<div class="w-full md:w-1/2 px-2">
						<label for="first_name">Last Name*</label>
						<input id="last_name" name="last_name" class="input input-bordered w-full" value="{{ $info->last_name }}" />
					</div>
				</div>


				{{-- addres 1 --}}
				<div class="w-full px-2">
					<label for="address_1">House Number, Building, Street Address* <span
							class="address-field hidden text-xs italic text-red-400">
							This field is required</span></label>
					<input value="" id="address_1" name="address_1" class="input input-bordered w-full" />
				</div>
				{{-- addres 2 --}}
				<div class="w-full px-2">
					<label for="address_2">Village / Subdivision, Barangay * <span
							class="address-field hidden text-xs italic text-red-400">
							This field is required</span> </label>
					<input value="" id="address_2" name="address_2" class="input input-bordered w-full" />
				</div>

				{{-- country, province / state --}}
				<div class="flex flex-wrap items-end">
					<div class="w-full md:w-1/2 px-2">
						<label for="country">Country* <span class="address-field hidden text-xs italic text-red-400">
								This field is
								required</span></label>
						<input value="" id="country" name="country" class="input input-bordered w-full" />
					</div>
					<div class="w-full md:w-1/2 px-2">
						<label for="province">Province/Region* <span class="address-field hidden text-xs italic text-red-400">
								This field
								is
								required</span></label>
						<input value="" id="province" name="province" class="input input-bordered w-full" />
					</div>
				</div>

				{{-- city, zip_code --}}
				<div class="flex flex-wrap items-end">
					<div class="w-full md:w-1/2 px-2">
						<label for="city">City* <p class="address-field hidden text-xs italic text-red-400">
								This field is
								required</p></label>
						<input value="" id="city" name="city" class="input input-bordered w-full" />
					</div>
					<div class="w-full md:w-1/2 px-2">
						<label for="zip_code">Zip / Postal Code*</label>
						<input id="zip_code" name="zip_code" class="input input-bordered w-full" value="{{ $info->zip_code }}" />
					</div>
				</div>

				{{-- phone_number, email_address --}}
				<div class="flex flex-wrap items-end">
					<div class="w-full md:w-1/2 px-2">
						<label for="phone_number">Mobile Number * (Format: 639178888888)</label>
						<input id="phone_number" name="phone_number" class="input input-bordered w-full"
							value="{{ $info->phone_number }}" />
					</div>
					<div class="w-full md:w-1/2 px-2">
						<label for="email">Email*</label>
						<input id="email" name="email" type="email" class="input input-bordered w-full"
							value="{{ $user->email }}" />
					</div>
				</div>


			</div>

			<button id="form-submit" type="submit"class="btn btn-primary">Proceed to Payment</button>


		</div>
	</div>
</form>

@push('scripts')
	<script>
		var strAddress = "{{ $info->address }}"
		var addr = strAddress.split(',');
		var formData = {
			first_name: '',
			last_name: '',
			zip_code: '',
			phone_number: '',
			email: '',
		};
		var address = {
			address_1: '',
			address_2: '',
			city: '',
			province: '',
			country: '',
		}
		const onSelectShipping = e => {
			const shipping_cost = e.currentTarget.dataset.value;
			const shipping_type = e.currentTarget.dataset.shipping;
			let activeStyle = "border-2 border-primary bg-primary bg-opacity-10 border-opacity-50 ";
			$(e.currentTarget).toggleClass(activeStyle);
			$(e.currentTarget).find("i").show();
			$(e.currentTarget).siblings().removeClass(activeStyle);
			$(e.currentTarget).siblings().find("i").hide();

			$("#shipping_cost").val(shipping_cost);
			$("#shipping_type").val(shipping_type);

			$("#shipping-cost").text(parseFloat(shipping_cost).toFixed(2));
			$("#shipping-type").text(shipping_type);

			const total = parseFloat($("#subtotal").text()) + parseFloat(shipping_cost);
			$(".total").text(total.toFixed(2));
		};

		$(document).ready(function() {

			// SET ADDRESS
			if (addr.length > 1) {
				Object.keys(address).forEach(function(key, index) {
					address[key] = addr[index].trim();
					$('#' + key).val(addr[index]);
				});
			}
			// COMPRESS PAYLOAD
			$('input').on('input', function() {
				if (formData.hasOwnProperty($(this).attr('name'))) {
					formData[$(this).attr('name')] = $(this).val();
				}
				if (address.hasOwnProperty($(this).attr('name'))) {
					address[$(this).attr('name')] = $(this).val();
				}
			});


			$('#form-submit').hide();
			$("[data-shipping-select]").on("click", onSelectShipping);

		});
	</script>
@endpush
