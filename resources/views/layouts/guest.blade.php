@props(['bg', 'footer'])

@php
    $classes = ($bg ?? 'font-sans antialiased bg-gradient-to-b from-indigo-100/10 via-violet-100/20 to-cyan-100/10');
@endphp

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
    @stack('scripts')
</head>

<body {{ $attributes->merge(['class' => $classes]) }}>
<livewire:layout.navigation/>

<main class="isolate pt-14">
    {{ $slot }}
</main>

<!-- Footer -->
@isset($footer)
    {{ $footer }}
@else
    <x-app.footer />
@endisset
</body>
</html>
