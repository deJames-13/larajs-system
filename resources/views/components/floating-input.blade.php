@props([
    'id' => '',
    'label' => '',
])

<div {{ $attributes->merge(['class' => 'relative z-0']) }}>
	<input type="text" id="{{ $id }}"
		class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer"
		placeholder=" " />

	<label for="{{ $id }}"
		class="absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
		{{ $label }}
	</label>
</div>
