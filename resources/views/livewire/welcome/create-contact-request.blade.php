<div class="max-w-xl mx-auto lg:max-w-4xl">
    <h2 class="text-4xl font-bold tracking-tight text-gray-900">{{ t('contactForm.headline') }}</h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">{{ t('contactForm.tagline') }}</p>
    <div class="flex flex-col gap-16 mt-16 sm:gap-y-20 lg:flex-row">
        <form wire:submit.prevent="submit" method="POST"
              class="lg:flex-auto">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <x-input-label for="companyName" :value="t('contactForm.companyName')"/>

                    <x-text-input
                        id="companyName"
                        type="text"
                        class="block w-full mt-1"
                        wire:model="companyName"
                        required
                        autocomplete="organization"/>

                    <x-input-error class="mt-2" :messages="$errors->get('companyName')"/>
                </div>
                <div>
                    <x-input-label for="contactPerson" :value="t('contactForm.contactPerson')"/>

                    <x-text-input
                        id="contactPerson"
                        type="text"
                        class="block w-full mt-1"
                        wire:model="contactPerson"
                        required autocomplete="fullname"/>

                    <x-input-error class="mt-2" :messages="$errors->get('contactPerson')"/>
                </div>
                <div>
                    <x-input-label for="email" :value="t('contactForm.email')"/>

                    <x-text-input
                        id="email"
                        type="email"
                        class="block w-full mt-1"
                        wire:model="email"
                        required autocomplete="email"/>

                    <x-input-error class="mt-2" :messages="$errors->get('email')"/>
                </div>
                <div>
                    <x-input-label for="phone" :value="t('contactForm.phone')"/>

                    <x-text-input
                        id="phone"
                        type="tel"
                        class="block w-full mt-1"
                        wire:model="phone"
                        required autocomplete="tel"/>

                    <x-input-error class="mt-2" :messages="$errors->get('email')"/>
                </div>
                <div class="sm:col-span-2">
                    <x-input-label for="message" :value="t('contactForm.message')"/>

                    <div class="mt-2.5">
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            wire:model="message"
                        ></textarea>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <button type="submit"
                        wire:loading.attr="disabled"
                        class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <svg wire:loading
                         class="h-4 w-4"
                         version="1.1"
                         xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         x="0px"
                         y="0px"
                         viewBox="0 0 100 100"
                         enable-background="new 0 0 0 0"
                         xml:space="preserve"
                    >
                        <path fill="#fff"
                              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite"/>
                        </path>
                    </svg>
                    {{  t('contactForm.submit') }}
                </button>
            </div>
            <!-- <p class="mt-4 text-sm leading-6 text-gray-500">By submitting this form, I agree to the <a
                        href="#" class="font-semibold text-indigo-600">privacy&nbsp;policy</a>.</p> -->
        </form>
    </div>
    <x-modal name="contact-form-success-modal" focusable>
        <div>
            <div class="flex items-center justify-center w-12 h-12 mx-auto rounded-full">
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
                <h3
                    class="text-base font-semibold leading-6 text-transparent from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text">
                    <span>{{ t('contactFormSuccessModal.headline') }}</span>
                </h3>
                <div class="mt-2">
                    <p class="text-sm text-gray-500">
                        {{ t('contactFormSuccessModal.thanks') }}
                    </p>
                    <p class="text-sm text-gray-500">
                        {{ t('contactFormSuccessModal.i_be_back') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="mt-5 sm:mt-6">
            <button type="button"
                    class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-lg shadow-2xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r shadow-purple-400"
                    @click="$dispatch('close')"
            >{{ t('contactFormSuccessModal.close') }}</button>
        </div>
    </x-modal>
</div>
