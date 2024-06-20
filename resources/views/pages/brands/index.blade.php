<x-layouts.default>
    <div class="flex flex-col min-h-screen p-12 mx-auto space-y-4">
        <div>
            <h1 class="text-2xl font-bold">Brands</h1>
        </div>
        <div id="brands-container" class="grid grid-cols-1 gap-8 place-items-center md:grid-cols-3 lg:grid-cols-5"></div>
    </div>

    @push('scripts')
        <script type="module">
            import Brands from "{{ asset('js/Brands/index.js') }}";
            new Brands({
                parent: '#brands-container',
                url: "{{ route('brands.index') }}"
            });
        </script>
    @endpush
</x-layouts.default>
