<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <x-application-logo class="mx-auto h-10 w-auto" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{{ t('projects.game.login.headline') }}</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="POST" wire:submit.prevent="submit" id="player_login-form">
            <div>
                <x-input-label for="name">
                    {{ t('projects.game.login.name') }}
                </x-input-label>
                <div class="mt-2">
                    <x-text-input wire:model="name" id="name" name="name" type="text" autocomplete="username" required class="block mt-1 w-full" />
                    <x-input-error :messages="$errors->get('name')" class="mt-2" />
                </div>

                <div>
                    <x-input-label for="password">
                        {{ t('projects.game.login.password') }}
                    </x-input-label>
                    <div class="mt-2">
                        <x-text-input wire:model="password" id="password" name="password" type="password" autocomplete="current-password" required class="block mt-1 w-full" />
                        <x-input-error :messages="$errors->get('password')" class="mt-2" />
                    </div>
                </div>

                <div class="mt-4">
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" wire:loading.attr="disabled" form="player_login-form">
                        Go!
                        <span wire:loading class="spinner">
                            <!-- icon from https://heroicons.com/ -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </span>
                    </button>
                </div>
        </form>
    </div>
</div>