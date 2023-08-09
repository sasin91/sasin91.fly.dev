<template>
    <div>
        <!-- Header -->
        <header class="absolute inset-x-0 top-0 z-50">
            <nav class="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8" aria-label="Global">
                <div class="flex lg:flex-1">
                    <a :href="route('welcome')" class="-m-1.5 p-1.5">
                        <span class="sr-only">{{ page.props.app.name }}</span>
                        <ApplicationLogo class="w-auto h-8" />
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button"
                        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        @click="mobileMenuOpen = true">
                        <span class="sr-only">Åbn hovedmenu</span>
                        <Bars3Icon class="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="hidden lg:flex lg:gap-x-12">
                    <NavLink v-for="item in navigation" :key="item.name" :href="item.href">
                        {{ $t(item.name) }}
                    </NavLink>
                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div v-if="page.props.auth.user" class="relative ml-3">
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <span class="inline-flex rounded-md">
                                    <button type="button"
                                        class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 transition-all duration-300 ease-in-out text-cyan-500 group">
                                        {{ $page.props.auth.user.name }}

                                        <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </template>

                            <template #content>
                                <DropdownLink :href="route('dashboard')">Instrumentbræt
                                    <span aria-hidden="true">&rarr;</span>
                                </DropdownLink>
                                <DropdownLink if="page.props.auth.user.can_access_filament"
                                    :href="route('filament.pages.dashboard')">
                                    Admin</DropdownLink>
                                <DropdownLink :href="route('profile.edit')"> Profile </DropdownLink>
                                <DropdownLink :href="route('logout')" method="post" as="button">
                                    Log Out
                                </DropdownLink>
                            </template>
                        </Dropdown>
                    </div>
                    <NavLink v-else :href="route('login')">Log ind <span aria-hidden="true">&rarr;</span></NavLink>
                </div>
            </nav>
            <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
                <div class="fixed inset-0 z-50" />
                <DialogPanel
                    class="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div class="flex items-center justify-between">
                        <a :href="route('welcome')" class="-m-1.5 p-1.5">
                            <span class="sr-only">{{ page.props.app.name }}</span>
                            <ApplicationLogo class="w-auto h-8" />
                        </a>
                        <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                            <span class="sr-only">Luk menu</span>
                            <XMarkIcon class="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="flow-root mt-6">
                        <div class="-my-6 divide-y divide-gray-500/10">
                            <div class="py-6 space-y-2">
                                <ResponsiveNavLink v-for="item in navigation" :key="item.name" :href="item.href">
                                    {{ item.name }}
                                </ResponsiveNavLink>
                            </div>
                            <div v-if="page.props.auth.user" class="py-6">
                                <div class="px-4">
                                    <div class="text-base font-medium text-gray-800 dark:text-gray-200">
                                        {{ $page.props.auth.user.name }}
                                    </div>
                                    <div class="text-sm font-medium text-gray-500">{{ $page.props.auth.user.email }}
                                    </div>
                                </div>

                                <div class="mt-3 space-y-1">
                                    <ResponsiveNavLink :href="route('dashboard')">Instrumentbræt
                                        <span aria-hidden="true">&rarr;</span>
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink if="page.props.auth.user.can_access_filament"
                                        :href="route('filament.pages.dashboard')">
                                        Admin</ResponsiveNavLink>
                                    <ResponsiveNavLink :href="route('profile.edit')"> Profile </ResponsiveNavLink>
                                    <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>

                            <ResponsiveNavLink v-else :href="route('login')">Log ind</ResponsiveNavLink>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>

        <main class="isolate">
            <!-- Hero section -->
            <div
                class="relative overflow-hidden isolate -z-10 bg-gradient-to-b from-indigo-100/20 via-violet-100/40 to-cyan-100/20 pt-14">
                <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-cyan-500/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                    aria-hidden="true" />
                <div class="px-6 py-32 mx-auto max-w-7xl sm:py-40 lg:px-8">
                    <div
                        class="max-w-2xl mx-auto lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1
                            class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                            {{ page.props.app.name }}</h1>
                        <div class="max-w-xl mt-6 lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p class="text-lg leading-8 text-gray-600">
                                👋 Jeg er Jonas, en webudvikler fra Slagelse. <br />
                                Jeg har arbejdet med PHP og Laravel siden 2015,
                                og har siden da været med til at udvikle et billet agentur, en video streaming platform og
                                en rekruteringsplatform.
                            </p>
                            <p class="text-lg leading-6 text-gray-600">
                                Jeg trives med nye og spændende ideér og udfordringer, og er altid klar på at lære noget
                                nyt.
                            </p>
                            <p class="text-lg leading-6 text-gray-600">
                                Og anerkender vigtigheden af at skrive ren og læsbar kode, som er nem at vedligeholde.
                            </p>
                            <div class="flex mt-6 space-x-6 md:order-2">
                                <a v-for="item in social" :key="item.name" :href="item.href"
                                    class="text-lg font-semibold leading-8 tracking-tight transition-all duration-300 ease-in-out group">
                                    <span class="sr-only">{{ item.name }}</span>
                                    <component :is="item.icon"
                                        class="w-6 h-6 text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                        aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                        <ApplicationLogo :width="1280" :height="1024" :radius="20"
                            class="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
                    </div>
                </div>
                <div class="absolute inset-x-0 bottom-0 h-24 -z-10 bg-gradient-to-t from-white sm:h-32" />
            </div>

            <!-- Timeline section -->
            <div class="px-6 mx-auto -mt-8 max-w-7xl lg:px-8">
                <div class="grid max-w-2xl grid-cols-1 gap-8 mx-auto overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    <a class="transition-all duration-300 ease-in-out group" target="_blank" :href="item.href || '#'"
                        v-for=" item in timeline" :key="item.name">
                        <time :datetime="item.dateTime"
                            class="flex items-center text-sm font-semibold leading-6 text-cyan-500">
                            <svg viewBox="0 0 4 4" class="flex-none w-1 h-1 mr-4" aria-hidden="true">
                                <circle cx="2" cy="2" r="2" fill="currentColor" />
                            </svg>
                            {{ item.date }}
                            <div class="absolute w-screen h-px -ml-2 -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                aria-hidden="true" />
                        </time>
                        <p :class="item.href ? 'text-cyan-400 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out' : 'text-gray-900'"
                            class="mt-6 text-lg font-semibold leading-8 tracking-tight">
                            {{ item.name }}</p>
                        <p class="mt-1 text-base leading-7 text-gray-600">{{ item.description }}</p>
                    </a>
                </div>
            </div>

            <!-- Features section -->
            <div class="pb-8 mt-32 overflow-hidden sm:mt-40">
                <div class="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
                    <h2 class="text-lg font-semibold text-sky-400">Kom sikkert og hurtigt i luften</h2>
                    <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Med mig på holdet, har i en
                        medspiller som kan løfte lidt af det hele</p>
                    <div class="mt-20">
                        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            <div v-for="feature in features" :key="feature.name" class="pt-6">
                                <div class="flow-root px-6 pb-8 rounded-lg shadow-lg bg-sky-100/10">
                                    <div class="-mt-6">
                                        <div>
                                            <span
                                                class="inline-flex items-center justify-center p-3 bg-indigo-500 shadow-lg rounded-xl">
                                                <component :is="feature.icon" class="w-8 h-8 text-white"
                                                    aria-hidden="true" />
                                            </span>
                                        </div>
                                        <h3 class="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{
                                            feature.name }}</h3>
                                        <p class="mt-5 text-base leading-7 text-gray-600">{{ feature.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Cases & Testimonials section -->
            <!-- <div class="mt-32 overflow-hidden sm:mt-40">
                <div class="px-6 mx-auto max-w-7xl lg:flex lg:px-8">
                    <div
                        class="grid max-w-2xl grid-cols-1 mx-auto gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
                        <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our people</h2>
                            <p class="mt-6 text-xl leading-8 text-gray-600">Quasi est quaerat. Sit molestiae et. Provident
                                ad dolorem occaecati eos iste. Soluta rerum quidem minus ut molestiae velit error quod.
                                Excepturi quidem expedita molestias quas.</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">Anim aute id magna aliqua ad ad non deserunt
                                sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.
                                Quasi aperiam sit non sit neque reprehenderit.</p>
                        </div>
                        <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                            <div class="flex-auto w-0 lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                                <img src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                                    alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                            </div>
                            <div
                                class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                                <div class="flex self-end justify-end flex-none order-first w-64 lg:w-auto">
                                    <img src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                                        alt=""
                                        class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                                <div class="flex justify-end flex-auto w-96 lg:w-auto lg:flex-none">
                                    <img src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                                        alt=""
                                        class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                    <img src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                                        alt=""
                                        class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

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
                <div class="max-w-xl mx-auto lg:max-w-4xl">
                    <h2 class="text-4xl font-bold tracking-tight text-gray-900">Lyder jeg spændende?</h2>
                    <p class="mt-2 text-lg leading-8 text-gray-600">Så lad os snakke sammen 🤗</p>
                    <div class="flex flex-col gap-16 mt-16 sm:gap-y-20 lg:flex-row">
                        <form @submit.prevent="submitContactForm" :action="route('contact-request.store')" method="POST"
                            class="lg:flex-auto">
                            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel for="companyName" value="Firma navn" />

                                    <TextInput id="companyName" type="text" class="block w-full mt-1"
                                        v-model="contactForm.companyName" @change="contactForm.validate('companyName')"
                                        required autocomplete="organization" />

                                    <InputError class="mt-2" :message="contactForm.errors.companyName" />
                                </div>
                                <div>
                                    <InputLabel for="contactPerson" value="Kontakt person" />

                                    <TextInput id="contactPerson" type="text" class="block w-full mt-1"
                                        v-model="contactForm.contactPerson" @change="contactForm.validate('contactPerson')"
                                        required autocomplete="fullname" />

                                    <InputError class="mt-2" :message="contactForm.errors.contactPerson" />
                                </div>
                                <div>
                                    <InputLabel for="email" value="E-mail addresse" />

                                    <TextInput id="email" type="email" class="block w-full mt-1" v-model="contactForm.email"
                                        @change="contactForm.validate('email')" required autocomplete="email" />

                                    <InputError class="mt-2" :message="contactForm.errors.email" />
                                </div>
                                <div>
                                    <InputLabel for="phone" value="Telefon Nr." />

                                    <TextInput id="phone" type="tel" class="block w-full mt-1" v-model="contactForm.phone"
                                        @change="contactForm.validate('phone')" required autocomplete="tel" />

                                    <InputError class="mt-2" :message="contactForm.errors.email" />
                                </div>
                                <div class="sm:col-span-2">
                                    <InputLabel for="message" value="Besked" />

                                    <div class="mt-2.5">
                                        <textarea v-model="contactForm.message" id="message" name="message" rows="4"
                                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-10">
                                <button type="submit" :disabled="contactForm.processing"
                                    class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Lad
                                    os snakke</button>
                            </div>
                            <!-- <p class="mt-4 text-sm leading-6 text-gray-500">By submitting this form, I agree to the <a
                                    href="#" class="font-semibold text-indigo-600">privacy&nbsp;policy</a>.</p> -->
                        </form>
                    </div>
                    <TransitionRoot as="template" :show="showContactFormSucessModal">
                        <Dialog as="div" class="relative z-10" @close="showContactFormSucessModal = false">
                            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                            </TransitionChild>

                            <div class="fixed inset-0 z-10 overflow-y-auto">
                                <div
                                    class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                                    <TransitionChild as="template" enter="ease-out duration-300"
                                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                        <DialogPanel
                                            class="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                            <div>
                                                <div
                                                    class="flex items-center justify-center w-12 h-12 mx-auto rounded-full">
                                                    <svg aria-hidden="true" width="109px" height="95px" viewBox="0 0 109 95"
                                                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                        xmlns:xlink="http://www.w3.org/1999/xlink">
                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <g>
                                                                <g transform="translate(0.000000, 0.000000)">
                                                                    <g>
                                                                        <g>
                                                                            <path
                                                                                d="M0.00694945708,49.0871997 L16.2679295,48.6516979 L16.7961047,48.1719656 L17.0925643,46.0863206 L17.8388247,44.8172413 L19.2938621,43.680854 L21.3656718,43.2283404 L23.2432494,43.7012681 L24.8891113,45.1166487 L27.7412573,48.8592417 L27.9354894,47.7602803 L27.9354894,27.053534 L28.7158256,25.539485 L30.0413749,24.4099024 L31.8678387,23.9607912 L33.6670419,24.3962929 L34.6586482,25.120995 L34.9994064,24.2533939 L34.9994064,22.892451 L35.4798754,21.4430468 L36.754311,20.054885 L38.2502393,19.3982301 L40.028997,19.5513362 L41.7327879,20.5516292 L42.6051288,21.8819509 L42.8811429,25.491852 L43.6308109,24.3520623 L45.0142891,23.2360891 L46.8986818,22.8958534 L48.3298661,23.3415622 L49.5974865,24.4711448 L50.261965,26.3254295 L50.4255289,43.7625105 L54.4703284,57.7734178 L55.6595745,66.5310854 L54.5487028,69.2733854 L52.4734855,71.7605085 L49.2124298,74.0570997 L46.074047,75.1696705 L41.4363283,75.5779534 L36.5396333,75.6017699 L6.99930719,75.6017699 C6.99930719,75.6017699 -0.255434337,62.8599419 0.00694945708,49.0871997 Z"
                                                                                fill="#FCEFD6" fill-rule="nonzero">
                                                                            </path>
                                                                            <path
                                                                                d="M36.3333333,44.4457916 L36.3333333,27.9316986 C36.3333333,25.7700564 34.6028028,24.0176991 32.4680851,24.0176991 L32.4680851,24.0176991 C30.3333675,24.0176991 28.6028369,25.7700564 28.6028369,27.9316986 L28.6028369,49.4247788"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M43.2907801,44.0353982 L43.2907801,23.2546861 C43.2889314,21.1242833 41.5589422,19.3982301 39.4255319,19.3982301 L39.4255319,19.3982301 C37.2921216,19.3982301 35.5621324,21.1242833 35.5602837,23.2546861 L35.5602837,25.1611734"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M51.0212766,44.8053097 L51.0212766,26.9331541 C51.0212766,24.8977824 49.2899467,23.2477876 47.154243,23.2477876 L47.154243,23.2477876 C45.0199339,23.2496658 43.2907801,24.8991106 43.2907801,26.9331541"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M56.4326241,65.8155072 C56.4326241,65.8155072 53.4384732,75.5185055 43.026994,75.5185055 C43.026994,75.5185055 37.1237533,76.6948325 32.0541115,70.204635 C28.4543255,65.5945209 21.5065345,55.6161397 17.7910654,50.224074 C16.4076942,48.2163739 16.9027845,45.4697045 18.9002622,44.0704556 L18.9002622,44.0704556 C20.9075855,42.6641227 23.6755198,43.1479051 25.0859058,45.1515886 L29.0191313,50.740842 L29.8969619,51.9477672 C30.3804637,52.6078164 31.0444624,53.1142811 31.8091355,53.4062767 L36.6814356,55.2625616 C39.8345169,56.433424 41.9066857,59.4629682 41.8531508,62.8236927 C41.8531508,62.9732834 41.8463459,63.1262739 41.8327361,63.2826642"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M17.0070922,48.6548673 L0.773049645,49.4247788"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M42.5177305,75.6183376 L7.73049645,75.6183376"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M55.4134948,68.6725664 L57.2056738,62.0007444 L55.4134948,28.1276369 C54.9960209,27.9565403 54.5483208,27.8680587 54.0960196,27.8672566 L54.0960196,27.8672566 C52.2274075,27.8691206 50.713071,29.3577826 50.7111749,31.1947137 L50.7111749,47.3450543 L47.6152803,44.4132399 C45.5939501,42.5029275 42.4080162,42.4732691 40.3502477,44.3456087 L40.3502477,44.3456087 C38.2354954,46.2678035 38.0749043,49.5003477 39.98906,51.6159672 L55.4134948,68.6725664"
                                                                                fill="#413D45" fill-rule="nonzero">
                                                                            </path>
                                                                            <path
                                                                                d="M85.8731014,49.6035531 L85.3597747,49.0942182 L85.3597747,32.2182555 L85.1931985,28.4525728 L83.7823999,26.4152333 L82.3376061,25.7361201 L80.4576745,25.7972403 L78.8293069,26.7717677 L77.9964258,27.4508809 L77.9964258,26.2114993 L77.6258787,23.6444515 L76.4496466,22.1571936 L74.9946543,21.457707 L73.3390907,21.457707 L71.3775707,22.5782437 L70.6262779,22.9857117 L70.6262779,21.8244281 L69.8545881,19.4814876 L68.0834409,18.1232612 L65.7411753,17.8584071 L63.830648,19.0434596 L62.8107936,20.8091539 L62.6782125,23.029854 L62.1920819,23.5391889 L60.4583294,22.5748482 L57.6401317,23.1181387 L56.1749409,24.6631212 L55.726205,26.995875 L55.726205,50.6697608 L55.4270477,50.9549883 L50.64733,45.0806593 L48.8591852,43.8107176 L46.6698978,43.6307526 L44.9157482,44.4117328 L43.7021214,45.9227596 L43.2907801,47.7054317 L43.3213758,48.2317445 L43.6035355,49.2877655 L44.4024215,50.5339382 L46.2857526,52.8361319 L53.6898956,61.8887107 L58.3540298,67.5864704 L62.0255057,71.6034249 L66.142318,74.465887 L70.065358,76.1229231 L74.3521461,77.0125614 L101.888215,77.1415929 C107.10647,65.9769721 109,49.6035531 109,49.6035531 L77.5136947,49.6035531"
                                                                                fill="#FCEFD6" fill-rule="nonzero">
                                                                            </path>
                                                                            <path
                                                                                d="M63.4637795,42.6234052 L63.4637795,26.3967632 C63.4637795,24.2324216 61.7176018,22.4778761 59.5635823,22.4778761 L59.5635823,22.4778761 C57.4095629,22.4778761 55.6633851,24.2324216 55.6633851,26.3967632 L55.6633851,51.1007201 C55.6625555,51.1302966 55.6436659,51.1562983 55.6158838,51.1661064 C55.5881016,51.1759144 55.5571772,51.1674988 55.5381184,51.1449437 L50.6053168,45.0454952 C49.200253,43.3023641 46.6691558,43.0006765 44.8972157,44.3651329 L44.8972157,44.3651329 C44.0150895,45.0482374 43.4454601,46.0608152 43.3179237,47.1724952 C43.1903873,48.2841751 43.5157895,49.4004211 44.2200981,50.2672762 L59.4315444,68.9772408 C63.6443695,74.1484427 69.945554,77.1455457 76.5964748,77.1415929 L102.042553,77.1415929"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M70.3475177,42.4955752 L70.3475177,21.7900857 C70.34204,19.6170414 68.6131128,17.8584071 66.4822695,17.8584071 L66.4822695,17.8584071 C65.4571419,17.8584071 64.4740009,18.2737039 63.7491263,19.012937 C63.0242516,19.7521701 62.6170213,20.7547854 62.6170213,21.8002189 L62.6170213,24.0126325"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M78.0775584,42.4955752 L78.0775584,24.9533999 C78.0937611,23.9039567 77.6774019,22.891294 76.9200994,22.1382452 C76.1627969,21.3851963 75.1266037,20.9534653 74.0395307,20.9380531 L74.0395307,20.9380531 C72.4242346,20.9493273 70.971616,21.8896401 70.3475177,23.3279765"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M85.8080445,49.4247788 L85.8080445,29.5049553 C85.841821,27.3591134 84.0356744,25.5927403 81.7717267,25.5575221 L81.7717267,25.5575221 C80.1507996,25.5729275 78.6965508,26.5051456 78.0780142,27.9253055"
                                                                                stroke="#413D45" stroke-width="1.155">
                                                                            </path>
                                                                            <path d="M79.6241135,49.4413465 L109,49.4413465"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <polygon fill="#413D45" fill-rule="nonzero"
                                                                                points="29.6467524 67.1327434 24.7375887 75.6017699 38.6524823 75.6017699 38.1756688 74.9197887 34.3309407 72.6476108 31.7924129 69.9295222">
                                                                            </polygon>
                                                                            <path
                                                                                d="M39.4255319,8.61946903 L41.7446809,12.4690265"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path d="M49,1.5 L51.0212766,7.84955752"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path d="M62,0 L60.2978723,7.84955752"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M71.893617,7.07964602 L70.3475177,10.9292035"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path d="M71.5,85 L69.5744681,82.5309735"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path d="M62.5,94.5 L60.2978723,87.1504425"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path d="M49.5,93 L51.0212766,87.1504425"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                            <path
                                                                                d="M39.4255319,87.920354 L40.9716312,84.0707965"
                                                                                stroke="#413D45" stroke-width="1.155"
                                                                                stroke-linecap="round"></path>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div class="mt-3 text-center sm:mt-5">
                                                    <DialogTitle as="h3"
                                                        class="text-base font-semibold leading-6 text-transparent from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text">
                                                        <span>Din forespørgsel er modtaget.</span>
                                                    </DialogTitle>
                                                    <div class="mt-2">
                                                        <p class="text-sm text-gray-500">
                                                            Tuside tak for beskeden.
                                                        </p>
                                                        <p class="text-sm text-gray-500">
                                                            Jeg vender tilbage hurtigst.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-5 sm:mt-6">
                                                <button type="button"
                                                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-lg shadow-2xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r shadow-purple-400"
                                                    @click="showContactFormSucessModal = false">Luk vinduet</button>
                                            </div>
                                        </DialogPanel>
                                    </TransitionChild>
                                </div>
                            </div>
                        </Dialog>
                    </TransitionRoot>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="mt-32 sm:mt-40" aria-labelledby="footer-heading">
            <h2 id="footer-heading" class="sr-only">Footer</h2>
            <div class="px-6 pb-8 mx-auto max-w-7xl lg:px-8">
                <div
                    class="pt-8 mt-16 border-t border-gray-900/10 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
                    <p class="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">&copy; {{ (new Date()).getFullYear()
                    }} {{ page.props.app.domain }}.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
  
<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import TextInput from '@/Components/TextInput.vue';
import type { PageProps } from '@/types/index';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { CircleStackIcon, ClipboardDocumentCheckIcon, CursorArrowRaysIcon, DocumentDuplicateIcon } from '@heroicons/vue/20/solid';
import {
    ArrowPathIcon,
    Bars3Icon,
    CloudArrowUpIcon,
    CogIcon,
    LockClosedIcon,
    ShieldCheckIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline';
import { usePage } from '@inertiajs/vue3';
import { useForm } from 'laravel-precognition-vue-inertia';
import { FunctionalComponent, defineComponent, h, ref } from 'vue';

const { navigation } = defineProps<{
    navigation: { name: string, href: string }[],
}>();

const page = usePage<PageProps>();

const social = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/jonaz.k.hansen',
        icon: defineComponent({
            render: () =>
                h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                    h('path', {
                        'fill-rule': 'evenodd',
                        d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                        'clip-rule': 'evenodd',
                    }),
                ]),
        }),
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/jonaz.k.hansen/',
        icon: defineComponent({
            render: () =>
                h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                    h('path', {
                        'fill-rule': 'evenodd',
                        d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
                        'clip-rule': 'evenodd',
                    }),
                ]),
        }),
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/sasin91',
        icon: defineComponent({
            render: () =>
                h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                    h('path', {
                        d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
                    }),
                ]),
        }),
    },
    {
        name: 'GitHub',
        href: 'https://github.com/sasin91',
        icon: defineComponent({
            render: () =>
                h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                    h('path', {
                        'fill-rule': 'evenodd',
                        d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                        'clip-rule': 'evenodd',
                    }),
                ]),
        }),
    },
    {
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCxkb83un4xXdCYXPucs_ceA',
        icon: defineComponent({
            render: () =>
                h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
                    h('path', {
                        'fill-rule': 'evenodd',
                        d: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
                        'clip-rule': 'evenodd',
                    }),
                ]),
        }),
    },
];

const timeline: { name: string, href?: string, description: string, date: string, dateTime: string }[] = [
    {
        name: 'Uddannet WebIntegrator 🎉',
        description:
            'Jeg bestod min uddannelse som WebIntegrator med et 12 tal. Jeg har lært at lave hjemmesider, webshops og meget mere.',
        date: 'Aug 2015',
        dateTime: '2015-08',
    },
    {
        name: 'Webudvikler hos GHC Travel ✈️',
        description:
            'Efter nogle praktik forløb andre steder, fik jeg i 2017 mit første job som web udvikler hos GHC Travel. Jeg stod for at migrere og modernisere deres eksiesterende hjemmeside fra ren PHP til Laravel 6 & Vue 2. Jeg har senere hen holdt Laravel opdateret og flyttet frontend koden ud i separate Nuxt projekter med delt kode imellem.',
        date: 'Feb 2017',
        dateTime: '2017-02',
    },
    {
        name: 'Udvikler hos Syncronet 📺',
        href: 'https://zometv.com',
        description:
            'Efter COVID-19 ramte Danmark, blev jeg desværre nød til at skifte job. Jeg fik et job hos Syncronet, hvor jeg har været vidt omkring for at hjælpe med at udvikle deres video streaming platform. I store drag tog jeg af det meste.',
        date: 'Feb 2020',
        dateTime: '2020-02',
    },
    {
        name: 'Webudvikler hos JUICE 👊',
        href: 'https://morejuice.io',
        description:
            'I 2023 fik jeg muligheden for at være med til noget nyt og spændende. Jeg fik et job hos JUICE, hvor jeg har været med til at udvikle en platform som vender job markedet på hovedet.',
        date: 'Jan 2023',
        dateTime: '2023-01',
    },
    {
        name: '🤝🫶',
        description: 'Grundet manglende omsætning, står jeg desværre til August 2023 uden job, måske er det dig der skal ansætte mig? ;)',
        date: 'Aug 2023',
        dateTime: '2023-08',
    }
]

const features: { name: string, description: string, icon: FunctionalComponent }[] = [
    {
        name: 'Servers',
        description: 'Jeg har erfaring med mange forskellige Linux distros, og kan sætte en server eller et cluster op fra bunden.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Sikkerhed 🛡️',
        description: 'Jeg har bla. arbejdet med at sætte sikrede VPN netværk op og har erfaring med at lave sikre web applikationer.',
        icon: LockClosedIcon,
    },
    {
        name: 'Backend API udvikling ⚙️',
        description: 'Jeg har erfaring med at lave APIer i Laravel, og har bla. lavet et API til en video streaming platform samt en billet booking platform.',
        icon: CogIcon,
    },
    {
        name: 'Automatiseret testing',
        description: 'Jeg har erfaring med at lave automatiserede tests i Laravel og Symfony med PHPUnit, jeg gør brug af TDD så vidt og når det er muligt.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Databaser 🍩',
        description: 'Jeg har udbredt erfaring med MySQL, MariaDB & PostgreSQL. Jeg har erfaring med ren SQL, Eloquent og Doctrine.',
        icon: CircleStackIcon,
    },
    {
        name: 'Frontend udvikling ✨',
        description: 'Jeg har erfaring med at lave frontend i Vue, React og Laravel blade + Livewire.',
        icon: ArrowPathIcon,
    },
    {
        name: 'App udvikling 📱',
        description: 'Jeg har erfaring med at lave apps i React Native inkl. native modules i Java/Kotlin & Objc/Swift.',
        icon: CursorArrowRaysIcon
    },
    {
        name: 'Version Control',
        description: 'Jeg har erfaring med Git og har bla. brugt det til at holde styr på mine egne projekter samt projekter på arbejde.',
        icon: ClipboardDocumentCheckIcon,
    },
    {
        name: 'Backups 💾',
        description: 'Jeg har lært hvor vigtigt det er at have backups af ens data, og har erfaring med at lave backups af databaser og filer.',
        icon: DocumentDuplicateIcon,
    },
]

const contactForm = useForm('post', route('contact-request.store'), {
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
});

const showContactFormSucessModal = ref(false);

function submitContactForm() {
    return contactForm.submit({
        preserveScroll: true,
        onSuccess: () => {
            contactForm.reset();
            showContactFormSucessModal.value = true;
        },
    });
}
const mobileMenuOpen = ref(false)
</script>