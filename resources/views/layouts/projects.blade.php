<x-guest-layout class="font-sans antialiased h-screen bg-gradient-to-r from-gray-100 via-slate-50 to-gray-200">
    <section class="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-72 w-[100%] origin-bottom-right skew-x-[-20deg] bg-gradient-to-r from-indigo-100/20 via-violet-200/40 to-cyan-100/20 shadow-xl shadow-indigo-400/50 ring-1 ring-teal-500 sm:-mr-48"
            aria-hidden="true"></div>
            {{ $slot }}
    </section>
</x-guest-layout>