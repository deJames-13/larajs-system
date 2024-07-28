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
	$shippingOptions = [
	    (object) [
	        'name' => 'standard',
	        'cost' => 50,
	        'days' => '3-5',
	    ],
	    (object) [
	        'name' => 'express',
	        'cost' => 80,
	        'days' => '2-3',
	    ],
	    (object) [
	        'name' => 'priority',
	        'cost' => 150,
	        'days' => '1-2',
	    ],
	];
@endphp
<form id="billing-form">
	@csrf
	{{-- Shipping --}}
	<input type="hidden" id="shipping_type" name="shipping_type" value="Standard">
	<input type="hidden" id="shipping_cost" name="shipping_cost" value="80">

	<div class="flex flex-col xl:flex-row">
		<div class="flex-grow">
			@include('components.card.partials._shipping')
			@include('components.card.partials._discounts')
		</div>
		<div class="container xl:min-h-full  xl:max-w-xs">
			@include('components.card.partials._order_info')
		</div>
	</div>

	{{-- Billing Address --}}
	@include('components.card.partials._address')


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
