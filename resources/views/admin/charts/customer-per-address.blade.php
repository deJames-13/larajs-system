<x-layouts.default class='charts'>
    <div class="container px-12 py-24 mx-auto">
        <div class="flex flex-col items-center justify-center space-y-4">
            <div class="w-[800px]">
                <canvas id="customer-per-address"></canvas>
            </div>
        </div>
    </div>

    @push('scripts')
        <script type="module" src="{{ asset('js/Charts/customer-per-address.js') }}"></script>
    @endpush
</x-layouts.default>
