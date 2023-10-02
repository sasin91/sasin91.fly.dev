<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet"/>
    <link rel="icon" href="{{ URL::asset('favicon.png') }}"/>

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="font-sans antialiased bg-gradient-to-br from-white via-cyan-100/5 to-magenta-100/20">
<livewire:layout.navigation />

<main class="isolate">
    {{ $slot }}
</main>

<!-- Footer -->
<footer class="mt-32 sm:mt-40" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="px-6 pb-8 mx-auto max-w-7xl lg:px-8">
        <div
            class="pt-8 mt-16 border-t border-gray-900/10 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
            <p class="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
                &copy; {{ date('Y') }} {{ parse_url(config('app.url'), PHP_URL_HOST) }}.</p>
        </div>
    </div>
</footer>
</body>
</html>
