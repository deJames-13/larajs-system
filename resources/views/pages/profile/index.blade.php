@extends('pages.profile.main')
@section('banner')
	@include('partials._banner', ['title' => 'User Account'])
@endsection

@section('left')
	@include('pages.profile.partials._user-card')
	@include('pages.profile.partials._nav')
@endsection

@section('right')
	<div class="py-8 flex flex-col space-y-4 rounded-lg">
		<h2 class="text-2xl font-extrabold">Purchases</h2>
		<div class="grid grid-cols-3 items-center gap-4">
			<div class="p-8 bg-yellow-400 text-white">
				<h3 class="text-2xl lg:text-4xl font-extrabold">
					<span id="status-pending">14</span>
				</h3>
				<div class="flex items-center space-x-2">
					<i class="fas fa-wallet"></i>
					<p class="text-md font-bold">To Pay</p>
				</div>
			</div>
			<div class="p-8 bg-blue-400 text-white">
				<h3 class="text-2xl lg:text-4xl font-extrabold">
					<span id="status-processing">420</span>
				</h3>
				<div class="flex items-center space-x-2">
					<i class="fas fa-box"></i>
					<p class="text-md font-bold">To Ship</p>
				</div>
			</div>
			<div class="p-8 bg-green-400 text-white">
				<h3 class="text-2xl lg:text-4xl font-extrabold">
					<span id="status-shipping">69</span>
				</h3>
				<div class="flex items-center space-x-2">
					<i class="fas fa-truck-fast"></i>
					<p class="text-md font-bold">To Receive</p>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col space-y-4 rounded-lg">
		<h2 class="text-2xl font-extrabold">Special Promos</h2>

		{{-- TODO: Add Special Promos --}}

	</div>
@endsection
