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
<div>
	<div class="info-container py-4 lg:px-12 ">
		<div
			class="_skeleton prose container max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl print:shadow-none print:p-0 print:border-0">

			<h2 class="print:m-0">Order Total</h2>
			{{-- Total Sales --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Total Sales</h4>
				<div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
			</div>
			<div class="divider"></div>
			{{-- Subtotal --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Subtotal</h4>
				<div class="text-sm font-bold">PHP <span id="subtotal">0.00</span></div>
			</div>

			{{-- Shipping --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Shipping</h4>
				<div class="text-sm font-bold">TBC</div>
			</div>

			{{-- Grandtotal --}}
			<div class="flex justify-between items-center">
				<h4 class="m-0">Grand Total</h4>
				<div class="text-sm font-bold">PHP <span id="total">0.00</span></div>
			</div>
			<div class="divider m-0"></div>


		</div>
	</div>

	<div class="_skeleton container py-4 lg:px-12 print:hidden">
		<div class="prose container max-md border-2 border-black p-2 lg:p-8 rounded shadow-xl">

			<h4>Billing Address</h4>
			<p>If you plan to pay via credit card, be sure to use the same billing address details as that of your credit card
				account to better ensure authorization of your purchase.</p>

			<form id="billing-form">
				@csrf

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
								class="address-field hidden text-xs italic text-red-400">This field is required</span></label>
						<input id="address_1" name="address_1" class="input input-bordered w-full" />
					</div>
					{{-- addres 2 --}}
					<div class="w-full px-2">
						<label for="address_2">Village / Subdivision, Barangay * <span
								class="address-field hidden text-xs italic text-red-400">This field is required</span> </label>
						<input id="address_2" name="address_2" class="input input-bordered w-full" />
					</div>

					{{-- country, province / state --}}
					<div class="flex flex-wrap items-end">
						<div class="w-full md:w-1/2 px-2">
							<label for="country">Country* <span class="address-field hidden text-xs italic text-red-400">This field is
									required</span></label>
							<input id="country" name="country" class="input input-bordered w-full" />
						</div>
						<div class="w-full md:w-1/2 px-2">
							<label for="province">Province/Region* <span class="address-field hidden text-xs italic text-red-400">This field
									is
									required</span></label>
							<input id="province" name="province" class="input input-bordered w-full" />
						</div>
					</div>

					{{-- city, zip_code --}}
					<div class="flex flex-wrap items-end">
						<div class="w-full md:w-1/2 px-2">
							<label for="city">City* <p class="address-field hidden text-xs italic text-red-400">This field is
									required</p></label>
							<input id="city" name="city" class="input input-bordered w-full" />
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
			</form>


		</div>

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

				if (addr.length > 1) {
					Object.keys(address).forEach(function(key, index) {
						address[key] = addr[index].trim();
						$('#' + key).val(addr[index]);
					});
				}

				$(document).ready(function() {
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

				});
			</script>
		@endpush

	</div>

</div>
