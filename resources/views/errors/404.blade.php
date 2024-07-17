<x-layouts.app :title="'404'" :page="'404'" :loading="false">
	<div class="grid place-items-center h-screen">
		<div class="prose lg:prose-xl">
			<h1>
				404 - Page not found
			</h1>
			<p>
				The page you are looking for does not exist.
			</p>
			{{-- button go back to homepage --}}
			<a href="/" class="btn btn-primary">
				Go back to homepage
			</a>
		</div>
	</div>
</x-layouts.app>
