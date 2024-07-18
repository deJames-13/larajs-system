<x-layouts.app :title="'403'" :page="'403'" :loading="false">
	<div class="grid place-items-center h-screen">
		<div class="prose lg:prose-xl">
			<h1>
				403 - Forbidden
			</h1>
			<p>
				You are not allowed to access this page.
			</p>
			{{-- button go back to homepage --}}
			<a href="/" class="btn btn-primary">
				Go back to homepage
			</a>
		</div>
	</div>
</x-layouts.app>
