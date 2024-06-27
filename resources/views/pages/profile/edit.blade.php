@extends('pages.profile.main')
@section('banner')
	@include('partials._banner', ['title' => 'Edit Profile', 'subtitle' => 'Edit your profile information.'])
@endsection

@section('left')
	@include('pages.profile.partials._nav')
@endsection

@section('right')
	<div class="py-8 flex flex-col space-y-4 rounded-lg border p-4 pb-72">
		<div class="">
			<div class="flex items-center justify-between">
				<h2 class="text-2xl font-extrabold">Edit Profile</h2>
				<div>
					<button class="btn btn-sm text-white btn-success hover:btn-primary">
						Save
					</button>
					<button class="btn btn-sm btn-secondary btn-outline hover:bg-error">
						Cancel
					</button>
				</div>
			</div>

			<div class="divider m-0"></div>
		</div>

		<form action="#" id="profile-info" class="flex flex-col justify-center ">
			<!--USER IMAGE -->
			<div class="flex justify-center">
				<div class="avatar">
					<div class="ring-primary ring-offset-base-100 w-48 rounded ring ring-offset-2">
						<img src="https://placehold.co/600x400?text=Profile" alt="profile-image">
					</div>
				</div>
			</div>

			<div class="flex p-4 justify-center space-x-2">
				<input id="profile-image" type="file" accept="image/*"
					class="max-w-sm file-input file-input-bordered file-input-primary" name="image">
			</div>


			<!--USER INFO -->
			<div class="container ">

				<div class="text-black flex flex-col justify-center lg:justify-start space-y-8">
					<div id="fullname" class="flex space-x-4">
						<x-floating-input id="full_name" label="Full Name" class="w-full" />

						<x-floating-input id="last_name" label="Last Name" class="w-full" />


					</div>
					<div class="flex space-x-4">
						<x-floating-input id="username" label="Username" class="w-1/3" />
						<x-floating-input id="email" label="Email" class="w-2/3" />


					</div>

					<div class="flex space-x-4">
						<x-floating-input id="address" label="Address" class="w-full" />
					</div>

					<div class="flex space-x-4">


						<x-floating-input id="city" label="City" class="w-full" />
						<x-floating-input id="region" label="Region/Province" class="w-full" />
						<x-floating-input id="country" label="Country" class="w-full" />
						<x-floating-input id="zip_code" label="Zip Code" class="w-full" />


					</div>
				</div>

			</div>
		</form>
	</div>
@endsection
