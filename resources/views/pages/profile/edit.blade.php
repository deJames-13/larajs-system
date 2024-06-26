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
			<div style="display: none" class="p-8 rounded-lg shadow-xl flex flex-col space-y-4 ">
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
		<div id="profile-page" class="right profile-page flex flex-col space-y-8 p-4 lg:p-8 flex-grow pb-24 max-h-screen">

			<div class="py-8 flex flex-col space-y-4 rounded-lg border p-4">
				<div class="">
					<h2 class="text-2xl font-extrabold">Edit Profile</h2>
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
								<div class="w-full relative z-0">
									<input type="text" id="first_name"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="first_name"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										First Name
									</label>
								</div>
								<div class="w-full relative z-0">
									<input type="text" id="last_name"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="last_name"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Last Name
									</label>
								</div>
							</div>
							<div class="flex space-x-4">
								<div class="w-1/3 relative z-0">
									<input type="text" id="username"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="username"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Username
									</label>
								</div>
								<div class="w-2/3 relative z-0">
									<input type="text" id="email"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="email"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Email
									</label>
								</div>
							</div>

							<div class="flex space-x-4">
								<div class="w-full relative z-0">
									<input type="text" id="address"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="address"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Street Address
									</label>
								</div>
							</div>

							<div class="flex space-x-4">
								<div class="w-full relative z-0">
									<input type="text" id="city"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="address"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										City
									</label>
								</div>
								<div class="w-full relative z-0">
									<input type="text" id="city"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="address"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Region
									</label>
								</div>
								<div class="w-full relative z-0">
									<input type="text" id="city"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="address"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Zip Code
									</label>
								</div>
								<div class="w-full relative z-0">
									<input type="text" id="city"
										class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										placeholder=" " />

									<label for="address"
										class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
										Country
									</label>
								</div>
							</div>
						</div>

					</div>
				</form>
			</div>




		</div>

	</div>
	</div>


</x-layouts.default>
