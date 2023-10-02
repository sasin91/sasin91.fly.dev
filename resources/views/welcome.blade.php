<x-guest-layout>
    <!-- Hero section -->
    <div
        class="relative overflow-hidden isolate -z-10 bg-gradient-to-b from-indigo-100/20 via-violet-100/40 to-cyan-100/20 pt-14">
        <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-cyan-500/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"></div>
        <div class="px-6 py-32 mx-auto max-w-7xl sm:py-40 lg:px-8">
            <div
                class="max-w-2xl mx-auto lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                <h1
                    class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                    {{ config('app.name') }}</h1>
                <div class="max-w-xl mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1">
                    <p class="text-lg leading-8 text-gray-600">
                        {!! t('hero.headline') !!}
                    </p>

                    <p class="text-lg leading-6 text-gray-600">
                        {{ t('hero.headline1') }}
                    </p>
                    <p class="text-lg leading-6 text-gray-600">
                        {{ t('hero.headline2') }}
                    </p>
                    <div class="flex mt-6 space-x-6 md:order-2">
                        @foreach($social as $item)
                            <a href="{{ $item['href'] }}"
                               class="text-lg font-semibold leading-8 tracking-tight transition-all duration-300 ease-in-out group">
                                <span class="sr-only">{{ $item['name'] }}</span>
                                <x-dynamic-component
                                    :component="$item['icon']"
                                    class="w-6 h-6 text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                    aria-hidden="true"
                                />
                            </a>
                        @endforeach
                    </div>
                </div>
                <img
                    alt="{{ t('Big image of me') }}"
                    src="{{ URL::asset('hero.png') }}"
                    class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                />
            </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-white sm:h-32"></div>
    </div>

    <!-- Timeline section -->
    <div class="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
        <div class="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
            @foreach($timeline as $item)
                <a class="transition-all duration-300 ease-in-out group" target="_blank"
                   href="{{ $item['href'] ?? '#' }}">
                    <time datetime="{{ $item['dateTime'] }}"
                          class="flex items-center text-sm font-semibold leading-6 text-cyan-500">
                        <svg viewBox="0 0 4 4" class="flex-none w-1 h-1 mr-4" aria-hidden="true">
                            <circle cx="2" cy="2" r="2" fill="currentColor"/>
                        </svg>
                        {{ $item['date'] }}
                        <div
                            class="absolute w-screen h-px -ml-2 -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                            aria-hidden="true">
                        </div>
                    </time>
                    <p class="mt-6 text-lg font-semibold leading-8 tracking-tight {{ !empty($item['href']) ? 'text-cyan-400 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out' : 'text-gray-900' }}">
                        {{ t($item['name']) }}
                    </p>
                    <p class="mt-1 text-base leading-7 text-gray-600">{{ ($item['description']) }}</p>
                </a>
            @endforeach
        </div>
    </div>

    <!-- Features section -->
    <div class="pb-8 mt-32 overflow-hidden sm:mt-40">
        <div class="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
            <h2 class="text-lg font-semibold text-sky-400">{{ t('features.headline') }}</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ t('features.tagline') }}
            </p>
            <div class="mt-20">
                <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    @foreach($features as $feature)
                        <div v-for="feature in features" :key="feature.name" class="pt-6">
                            <div class="flow-root px-6 pb-8 rounded-lg shadow-lg bg-sky-100/10">
                                <div class="-mt-6">
                                    <div>
                                        <span
                                            class="inline-flex items-center justify-center p-3 bg-indigo-500 shadow-lg rounded-xl">
                                            <x-dynamic-component :component="$feature['icon']"
                                                                 class="w-8 h-8 text-white" aria-hidden="true"/>
                                        </span>
                                    </div>
                                    <h3 class="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                                        {{ t($feature['name']) }}</h3>
                                    <p class="mt-5 text-base leading-7 text-gray-600">{{ $feature['description'] }}</p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <!-- Contact section -->
    <div
        class="relative px-6 py-24 mx-auto mt-32 max-w-7xl sm:mt-40 lg:px-8 isolate sm:py-32 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-white via-cyan-100/5 to-magenta-100/20">
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,skyblue,transparent)]"
             aria-hidden="true">
            <defs>
                <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width="200" height="200" x="50%" y="-64"
                         patternUnits="userSpaceOnUse">
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
            </defs>
            <svg x="50%" y="-64" class="overflow-visible fill-gray-50">
                <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
                    stroke-width="0" />
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
        </svg>
        <livewire:welcome.create-contact-request />
    </div>
</x-guest-layout>
