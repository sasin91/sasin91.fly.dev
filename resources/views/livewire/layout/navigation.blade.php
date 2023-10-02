<?php

use Livewire\Volt\Component;

new class extends Component {
    public function logout(): void
    {
        auth()->guard('web')->logout();

        session()->invalidate();
        session()->regenerateToken();

        $this->redirect('/', navigate: true);
    }
}; ?>

<!-- Header -->
<header x-data="{ mobileMenuOpen: false }" class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8"
         aria-label="Global">
        <div class="flex lg:flex-1">
            <a href="{{ route('welcome') }}" class="-m-1.5 p-1.5">
                <span class="sr-only">{{ config('app.name') }}</span>
                <x-application-logo class="w-auto h-8"/>
            </a>
        </div>
        <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                <span class="sr-only">{{ __('menus')['main']['open'] }}</span>
                <Bars3Icon class="w-6 h-6" aria-hidden="true"/>
            </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
            <x-nav-link href="{{ route('uses') }}" :active="request()->routeIs('uses')" wire:navigate>
                {{ __('navigation')['global']['uses'] }}
            </x-nav-link>
            <x-nav-link href="{{ route('projects') }}" :active="request()->routeIs('projects')" wire:navigate>
                {{ __('navigation')['global']['projects'] }}
            </x-nav-link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <form method="post" action="{{ route('locale.change') }}">
                <label for="locale" class="block text-sm font-medium leading-6 text-gray-900">
                    <select onchange="this.form.submit()"
                            id="locale"
                            name="locale"
                            class="mt-2 border-none bg-transparent py-1.5 pl-3 pr-10 block w-full border-l-4 border-transparent text-left text-base font-medium text-gray-600 transition-all duration-300 ease-in-out group sm:text-sm sm:leading-6">
                        @foreach(config('app.available_locales') as $locale)
                            <option
                                class="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                @selected(config('app.locale') == $locale)
                                value="{{ $locale }}"
                            >
                                {{ $locale }}
                            </option>
                        @endforeach
                    </select>
                </label>
                @csrf
            </form>
            @auth()
                <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')" wire:navigate>
                    {{ __('navigation')['guest']['dashboard'] }} <span aria-hidden="true">&rarr;</span>
                </x-nav-link>
            @else
                <x-nav-link :href="route('login')" :active="request()->routeIs('login')" wire:navigate>
                    {{ __('navigation')['guest']['log_in'] }} <span aria-hidden="true">&rarr;</span>
                </x-nav-link>
            @endauth
        </div>
    </nav>
    <!-- Responsive Navigation Menu -->
    <div :class="{'block': mobileMenuOpen, 'hidden': ! mobileMenuOpen}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link href="{{ route('uses') }}" :active="request()->routeIs('uses')" wire:navigate>
                {{ __('navigation')['global']['uses'] }}
            </x-responsive-nav-link>
            <x-responsive-nav-link href="{{ route('projects') }}" :active="request()->routeIs('projects')"
                                   wire:navigate>
                {{ __('navigation')['global']['projects'] }}
            </x-responsive-nav-link>

            <form method="post" action="{{ route('locale.change') }}">
                <label for="locale" class="block text-sm font-medium leading-6 text-gray-900">
                    <select onchange="this.form.submit()"
                            id="locale"
                            name="locale"
                            class="mt-2 border-none bg-transparent py-1.5 pl-3 pr-10 block w-full border-l-4 border-transparent text-left text-base font-medium text-gray-600 transition-all duration-300 ease-in-out group sm:text-sm sm:leading-6">
                        @foreach(config('app.available_locales') as $locale)
                            <option
                                class="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                @selected(config('app.locale') == $locale)
                                value="{{ $locale }}"
                            >
                                {{ $locale }}
                            </option>
                        @endforeach
                    </select>
                </label>
                @csrf
            </form>

            @auth()
                <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')"
                                       wire:navigate>
                    {{ __('navigation')['guest']['dashboard'] }} <span aria-hidden="true">&rarr;</span>
                </x-responsive-nav-link>
            @else
                <x-responsive-nav-link :href="route('login')" :active="request()->routeIs('login')" wire:navigate>
                    {{ __('navigation')['guest']['log_in'] }} <span aria-hidden="true">&rarr;</span>
                </x-responsive-nav-link>
            @endauth
        </div>
    </div>
</header>
