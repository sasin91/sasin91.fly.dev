<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{ t('app.description') }}">
    <link rel="prefetch" crossorigin="anonymous" href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_wasm_wrapper.js" />
    <link rel="prefetch" crossorigin="anonymous" href="https://www.gstatic.com/draco/versioned/decoders/1.5.5/draco_decoder.wasm" />
    <title inertia>{{ t('app.title') }}</title>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>