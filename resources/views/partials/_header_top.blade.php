<div class="bg-primary bg-opacity-50 px-4 lg:px-0 p-1">
	<div class="container mx-auto flex items-center justify-between text-white">
		{{-- START --}}
		<div class="flex space-x-4 items-center">
			<div class="cursor-pointer flex space-x-1 items-center">
				<a class="hover:text-secondary"><i class="fab fa-facebook"></i></a>
				<a class="hover:text-secondary"><i class="fab fa-instagram"></i></a>
				<a class="hover:text-secondary"><i class="fas fa-phone"></i></a>
				<span class="text-xs font-bold">Contact Us</span>
			</div>

			@role('admin,staff')
				@if (!($page === 'dashboard' || $page === 'dashboard'))
					<div class="cursor-pointer space-x-1 flex items-center">
						<i class="fas fa-cog"></i>
						<a href="/dashboard" class="text-xs font-bold">Go To Dashboard</a>
					</div>
				@endif
			@endrole

			@auth
				@if (!($page === 'shop' || $page === 'shop'))
					<div class="cursor-pointer space-x-1 flex items-center">
						<i class="fas fa-store"></i>
						<a href="/products" class="text-xs font-bold">Go To Shop</a>
					</div>
				@endif
			@else
				<div class="cursor-pointer space-x-1 flex items-center">
					<i class="fas fa-store"></i>
					<a href="/products" class="text-xs font-bold">Shop Now</a>
				</div>

			@endauth

		</div>


		{{-- END --}}
		<div class="flex space-x-1 items-center">
			{{-- User --}}
			<div class="auth-dropdown dropdown dropdown-end ">
				<div class="w-full flex space-x-1 items-center">

					@auth <span class="text-xs font-bold">{{ auth()->user()->username }}</span>
					@else
						<label tabindex="0" role="button" for="header-avatar" class="text-xs font-bold">Login / Register</label>
					@endauth

					<div id="header-avatar" tabindex="0" role="button" class="avatar">
						@auth
							@php
								$image = isset(auth()->user()->images[0])
								    ? auth()->user()->images[0]->path
								    : 'https://img.icons8.com/ios-glyphs/30/user--v1.png';
							@endphp

							<div class="w-8 rounded-full">
								<img id="profile-image" alt="{{ auth()->user()->username }}" src="{{ $image }}" />
							</div>
						@else
							<div class="w-5 rounded-full">
								<img id="profile-image" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1" />
							</div>
						@endauth
					</div>
				</div>
				@if (!($page === 'login' || $page === 'register'))
					<ul tabindex="0"
						class="text-primary menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

						{{-- Authenticated User --}}
						@auth
							<li>
								<a href="/profile" class="justify-between">
									Profile
									{{-- <span class="badge">New</span> --}}
								</a>
							</li>
							<li>
								<form id="logout-btn" method="POST" action="{{ route('logout') }}" class="flex">
									@csrf
									<button type="submit" class="w-full text-left hover:bg-transparent hover:scale-100">Logout</button>
								</form>
							</li>
						@else
							<li><button class="auth-btn" data-open-modal="signup_modal">Register</button></li>
							<li><button class="auth-btn" data-open-modal="login_modal">Login</button></li>
						@endauth

					</ul>
				@endif
			</div>
			{{-- Cart --}}
			@role('customer')
				<a class="cursor-pointer flex space-x-2 items-center">
					<div class="{{ Route::currentRouteName() == 'cart' ? 'hidden' : '' }} dropdown dropdown-end">
						<div tabindex="0" role="button" class="flex items-center p-1">
							<div class="indicator">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
								<span id="cart-badge" class="cart-qty badge badge-sm indicator-item">0</span>
							</div>
						</div>
						<div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow text-black">
							<div class="card-body">
								<div class="flex-col">
									<h2 class="text-lg font-bold"><span id="cart-qty">0</span> Item/s</h2>
									<p class="text-info">Subtotal: PHP <span id="cart-sbt">0</span> </p>
								</div>
								<div class="card-actions">
									<a href="/cart" id="cart-view" class="btn btn-primary btn-block">View cart</a>
								</div>
							</div>
						</div>
					</div>
				</a>
			@endrole
		</div>
	</div>
</div>
