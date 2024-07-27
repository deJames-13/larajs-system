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
							@if (isset(auth()->user()->images[0]))
								<div class="w-8 rounded-full">
									<img id="profile-image" alt="{{ auth()->user()->username }}" src="{{ auth()->user()->images[0]->path }}" />
								</div>
							@else
								<i class="fas fa-user"></i>
							@endif
						@else
							<i class="fas fa-user"></i>
						@endauth
					</div>
				</div>
				@if (!($page === 'login' || $page === 'register'))
					<ul tabindex="0"
						class="text-primary menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

						{{-- Authenticated User --}}
						@auth
							<li>
								<a href="/profile" class="gap-2">
									<i class="fas fa-user"></i>
									Profile
									{{-- <span class="badge">New</span> --}}
								</a>
							</li>
							<li>
								<a href="/profile?nav=cart" class="gap-2">
									<i class="fas fa-cart-shopping"></i>
									Cart
									{{-- <span class="badge">New</span> --}}
								</a>
							</li>
							<li>
								<a href="/profile?nav=orders" class="gap-2">
									<i class="fas fa-truck-fast"></i>
									Orders
									{{-- <span class="badge">New</span> --}}
								</a>
							</li>
							<li></li>
							<li>
								<button class="auth-btn" type="button" data-open-modal="logout">
									<i class="fas fa-arrow-right-from-bracket"></i>
									Logout
								</button>
							</li>
						@else
							<li>
								<button class="auth-btn" type="button" data-open-modal="signup_modal">
									<i class="fas fa-user"></i>
									Register
								</button>
							</li>
							<li>
								<button class="auth-btn" type="button" data-open-modal="login_modal">
									<i class="fas fa-arrow-right-to-bracket"></i>
									Login
								</button>
							</li>
						@endauth

					</ul>
				@endif
			</div>
			{{-- Cart --}}

      @auth
			<a id="mini-cart" class=" {{ Route::is('profile') ? 'hidden' : '' }} cursor-pointer flex space-x-2 items-center">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="flex items-center p-1">
						<div class="indicator animate__animated ">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
              <span data-qty="{{ auth()->user()->getCart()->count }}" id="cart-indicator"
                class="cart-count badge badge-sm indicator-item badge-primary font-bold">
                {{ auth()->user()->getCart()->count }}
              </span>
						</div>
					</div>
					<div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow text-black">
						<div class="card-body">
							<div class="flex-col">
								<h2 class="text-lg font-bold">
									<span class="cart-count">
										{{ auth()->user()->getCart()->count }}
									</span>
									Item/s
								</h2>
								<p class="text-info">
									Subtotal: PHP
									<span id="cart-total">
										{{ auth()->user()->getCart()->total }}
									</span>
								</p>
							</div>
						</div>
						<div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow text-black">
							<div class="card-body">
								<div class="flex-col">
									<h2 class="text-lg font-bold">
										<span class="cart-count">
											{{ auth()->user()->getCart()->count }}
										</span>
										Item/s
									</h2>
									<p class="text-info">
										Subtotal: PHP
										<span id="cart-total">
											{{ auth()->user()->getCart()->total }}
										</span>
									</p>
								</div>
								<div class="card-actions">
									<a href="/profile?nav=cart" id="cart-view" class="btn btn-primary btn-block">View cart</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
      @endauth
		</div>
	</div>
</div>
