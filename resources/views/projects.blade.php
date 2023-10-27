@php use App\Livewire\Projects\GameLogin; @endphp
<x-projects-layout>
    <article class="container mx-auto">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ __('My projects') }}</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">{{ __('Sometimes a interesting & usually wacky idea crosses my mind, i may make a project out of it') }}</p>
        </div>
        <ul role="list"
            class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <li>
                <a href="{{ route(GameLogin::ROUTE) }}">
                    <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                         src="{{ Storage::url('projects/tyler-van-der-hoeven-_ok8uVzL2gI-unsplash.jpg') }}"
                         alt="">
                    <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ __('Game') }}</h3>
                    <picture class="text-base leading-7 text-gray-600">✨</picture>
                </a>
            </li>
        </ul>
    </article>
</x-projects-layout>
