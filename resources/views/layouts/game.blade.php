<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="icon" href="{{ URL::asset('favicon.png') }}" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/projects/game.js'])
    @livewireScripts()
    @stack('scripts')

    <script defer>
        document.addEventListener('DOMContentLoaded', function() {
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
</head>

<body class="w-full h-full absolute bg-black m-0 p-0 overscroll-none">
    <main class="isolate pt-14">
        {{ $slot }}
    </main>
</body>