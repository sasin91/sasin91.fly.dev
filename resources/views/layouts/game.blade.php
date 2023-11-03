<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="icon" href="{{ URL::asset('favicon.png') }}" />

    <!-- Scripts -->
    <script type="importmap">
        {
          "imports": {
            "three": "https://unpkg.com/three@0.158.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.158.0/examples/jsm/"
          }
        }
      </script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireScripts()
    @livewireStyles()
</head>

<body class="w-full h-full absolute bg-black m-0 p-0 overscroll-none">
    <main class="isolate pt-14">
        {{ $slot }}
    </main>


    @stack('scripts')

    <script defer>
        document.addEventListener('DOMContentLoaded', function() {
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
</body>
