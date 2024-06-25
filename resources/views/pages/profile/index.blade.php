<x-layouts.default>
	<div class="w-full py-16 flex items-center justify-center bg-gray-400 bg-opacity-40">
		<h1 class="font-extrabold text-2xl lg:text-5xl">
			User Account
		</h1>
	</div>

	<div
		class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8  justify-center container mx-auto max-h-screen">
		<div class="left flex flex-col space-y-8 py-4 lg:py-8 container max-w-sm">
			<!--USER CARD -->
			<div class="p-8 rounded-lg shadow-xl flex flex-col space-y-4 ">
				<h2 class="text-2xl font-extrabold">Your Profile</h2>
				<div class="flex space-x-4 items-center">
					<!--USER IMAGE -->
					<div class="avatar">
						<div class="ring-primary ring-offset-base-100 w-24 rounded ring ring-offset-2">
							<img src="https://placehold.co/600x400?text=Profile" alt="profile-image">
						</div>
					</div>

					<!--USER INFO -->
					<div class="flex flex-col">
						<span class="font-extrabold text-lg">John Doe</span>
						<span class="font-bold text-gray-400 text-md">
							johndoe@example.com
						</span>
						<a id="view-profile" class="hover:text-primary cursor-pointer font-bold text-gray-600 text-sm">
							View More
						</a>
					</div>
				</div>

			</div>

			<!--NAV-->
			<div class="nav p-8 rounded-lg border flex flex-col space-y-4">
				<h2 class="text-2xl font-extrabold">Navigation</h2>
				<ul class="flex flex-col space-y-4">

					<li>
						<div
							class="flex space-x-1 items-center font-bold text-gray-600 text-sm hover:text-primary hover:text-lg transition-all ease-in">
							<i class="fas fa-user"></i>
							<a href="#">Edit Profile</a>
						</div>
					</li>

					<li>
						<div
							class="flex space-x-1 items-center font-bold text-gray-600 text-sm hover:text-primary hover:text-lg transition-all ease-in">
							<i class="fas fa-cart-flatbed"></i>
							<a href="#">Orders</a>
						</div>
					</li>

					<li>
						<div
							class="flex space-x-1 items-center font-bold text-gray-600 text-sm hover:text-primary hover:text-lg transition-all ease-in">
							<i class="fas fa-cart-shopping"></i>
							<a href="#">Cart</a>
						</div>
					</li>
					<li>
						<div
							class="flex space-x-1 items-center font-bold text-gray-600 text-sm hover:text-primary hover:text-lg transition-all ease-in">
							<i class="fas fa-arrow-right-from-bracket"></i>
							<a href="#">Logout</a>
						</div>
					</li>
				</ul>
			</div>



		</div>
		<div id="profile-page" class="right profile-page flex flex-col space-y-8 p-4 lg:p-8 flex-grow ">

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

		</div>
	</div>


</x-layouts.default>
