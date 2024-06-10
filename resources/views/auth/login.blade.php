<x-layouts.default>
	<div class=" prose mx-auto container h-screen p-12">
		<div class="flex justify-center py-18">
			<x-card>
				<x-slot name="title">
					Login
				</x-slot>
				<x-slot name="content">
					<form method="POST" action="{{ route('login') }}">
						@csrf

						<div class="form-control">
							<label for="email" class="label">Email</label>
							<input type="email" id="email" name="email" placeholder="Email Address" class="input input-bordered"
								required>
							<x-alert.input-error :field="'email'" />
						</div>
						<div class="form-control">
							<label for="password" class="label">Password</label>
							<input type="password" id="password" name="password" placeholder="Password" class="input input-bordered"
								required>
							<x-alert.input-error :field="'password'" />
						</div>

						<div class="form-control mt-6">
							<button type="submit" class="btn btn-primary">Login</button>
						</div>
					</form>
				</x-slot>

			</x-card>
		</div>
	</div>
</x-layouts.default>
