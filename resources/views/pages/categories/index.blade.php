<x-layouts.default>
    <div class="flex flex-col min-h-screen p-12 mx-auto space-y-4">
        <div>
            <h1 class="text-2xl font-bold">Categories</h1>
        </div>
        <div id="categories-container" class="grid grid-cols-1 gap-8 place-items-center md:grid-cols-3 lg:grid-cols-5"></div>
    </div>

    @push('scripts')
        <script type="module">
            import Categories from "{{ asset('js/Categories/index.js') }}";
            new Categories({
                parent: '#categories-container',
                url: "{{ route('categories.index') }}"
            });
        </script>
    @endpush
</x-layouts.default>
