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
