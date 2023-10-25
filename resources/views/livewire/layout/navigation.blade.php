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
            <a href="{{ route('welcome') }}" class="-m-1.5 p-1.5" wire:navigate>
                <span class="sr-only">{{ config('app.name') }}</span>
                <x-application-logo class="w-auto h-8"/>
            </a>
        </div>
        <div class="flex lg:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                <span class="sr-only">{{ t('menus.main.open') }}</span>
                <x-heroicon-m-bars-3 class="w-6 h-6" aria-hidden="true"/>
            </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
            <x-nav-link href="{{ url('blog') }}" :active="request()->is('blog')" wire:navigate.hover>
                {{ t('navigation.global.blog') }}
            </x-nav-link>
            <x-nav-link href="{{ url('projects') }}" :active="request()->is('projects')" wire:navigate.hover>
                {{ t('navigation.global.projects') }}
            </x-nav-link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <livewire:locale-changer/>
            <livewire:visitors/>
            @auth()
                <!-- Settings Dropdown -->
                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <x-dropdown align="right" width="48">
                        <x-slot name="trigger">
                            <button
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                <div x-data="{ name: '{{ auth()->user()->name }}' }" x-text="name"
                                     x-on:profile-updated.window="name = $event.detail.name"></div>

                                <div class="ml-1">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </div>
                            </button>
                        </x-slot>

                        <x-slot name="content">
                            <x-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')"
                                        wire:navigate>
                                {{ t('navigation.authenticated.dashboard') }}
                            </x-nav-link>

                            <x-dropdown-link :href="route('profile')" wire:navigate>
                                {{ __('Profile') }}
                            </x-dropdown-link>

                            <!-- Authentication -->
                            <button wire:click="logout" class="w-full text-left">
                                <x-dropdown-link>
                                    {{ __('Log Out') }}
                                </x-dropdown-link>
                            </button>
                        </x-slot>
                    </x-dropdown>
                </div>
            @else
                <x-nav-link :href="route('login')" :active="request()->routeIs('login')" wire:navigate>
                    {{ t('navigation.guest.log_in') }} <span aria-hidden="true">&rarr;</span>
                </x-nav-link>
            @endauth
        </div>
    </nav>
    <!-- Responsive Navigation Menu -->
    <div :class="{'block': mobileMenuOpen, 'hidden': ! mobileMenuOpen}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link href="{{ url('blog') }}" :active="request()->is('blog')" wire:navigate>
                {{ t('navigation.global.blog') }}
            </x-responsive-nav-link>

            <x-responsive-nav-link href="{{ url('projects') }}" :active="request()->is('projects')" wire:navigate>
                {{ t('navigation.global.projects') }}
            </x-responsive-nav-link>

            <livewire:locale-changer/>

            @auth()
                <!-- Responsive Settings Options -->
                <div class="pt-4 pb-1 border-t border-gray-200">
                    <div class="px-4">
                        <div class="font-medium text-base text-gray-800" x-data="{ name: '{{ auth()->user()->name }}' }"
                             x-text="name" x-on:profile-updated.window="name = $event.detail.name"></div>
                        <div class="font-medium text-sm text-gray-500">{{ auth()->user()->email }}</div>
                    </div>

                    <div class="mt-3 space-y-1">
                        <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')"
                                               wire:navigate>
                            {{ t('navigation.authenticated.dashboard') }}
                        </x-responsive-nav-link>

                        <x-responsive-nav-link :href="route('profile')" wire:navigate>
                            {{ __('Profile') }}
                        </x-responsive-nav-link>

                        <!-- Authentication -->
                        <button wire:click="logout" class="w-full text-left">
                            <x-responsive-nav-link>
                                {{ __('Log Out') }}
                            </x-responsive-nav-link>
                        </button>
                    </div>
                </div>
            @else
                <x-responsive-nav-link :href="route('login')" :active="request()->routeIs('login')" wire:navigate>
                    {{ t('navigation.guest.log_in') }} <span aria-hidden="true">&rarr;</span>
                </x-responsive-nav-link>
            @endauth
        </div>
    </div>
</header>
