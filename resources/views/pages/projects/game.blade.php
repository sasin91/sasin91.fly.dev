@push('scripts')
    @vite('resources/js/projects/game/index.ts')

    <script defer>
        document.addEventListener('DOMContentLoaded', function () {
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
@endpush

<x-guest-layout>
    <div id="container" class="mt-4"></div>

    <x-slot:footer>
        <!-- empty -->
    </x-slot:footer>
</x-guest-layout>
