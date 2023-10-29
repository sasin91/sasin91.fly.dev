<div class="w-full h-full relative" id="container">
    <div class="w-full h-full absolute top-0 left-0" id="game-ui">
        <div class="absolute left-24 bottom-12 bg-[rgba(1.0, 1.0, 1.0, 0.0)] w-96 h-32 py-3 rounded-xl">
            <div class="flex flex-col justify-end w-full h-full border-4 rounded-md shadow-lg left-ui-area" id="left-ui-area">
                <div class="w-full h-full flex flex-row justify-center items-end">
                    <div class="h-full flex flex-col justify-center items-center">
                        <div class="text-white text-shadow text-2xl" id="charge-text">100%</div>
                        <div class="text-white text-shadow text-4xl" id="health-text">100</div>
                    </div>
                    <div class="h-full flex flex-col justify-center items-center">
                        <div class="bg-[url({{ Storage::url('/projects/game/ui/flash_on_FILL0_wght700_GRAD0_opsz48.svg') }})] bg-contain h-6 w-6 ml-0.5 invert drop-shadow"></div>
                        <div class="bg-[url({{ Storage::url('/projects/game/ui/add_box_FILL0_wght700_GRAD0_opsz48.svg') }})] bg-contain h-6 w-6 ml-0.5 invert drop-shadow"></div>
                    </div>
                    <div class="h-full flex flex-col justify-center items-center">
                        <div class="h-6 w-48 ml-0.5">
                            <div class="h-full bg-red-500 rounded shadow-md hover:shadow-lg" id="charge-bar"></div>
                        </div>
                        <div class="h-6 w-48 m-0.5">
                            <div class="h-full bg-blue-500 rounded shadow-md hover:shadow-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute w-96 h-28 pt-2 pr-2 rounded-lg right-28 bottom-64 bg-transparent">
            <div class="flex w-full h-full flex-col justify-end rounded shadow-md transform perspective-600 rotate-y-30 rotate-z-3" id="right-ui-area">
                <div class="w-full h-full flex flex-row justify-center items-end">
                    <div class="h-full flex flex-col justify-center items-center ml-2">
                        <div class="text-white text-shadow min-h-[30px]"></div>
                        <div class="weapon-pic-text">25</div>
                    </div>
                    <div class="h-full flex flex-col justify-center items-center ml-2">
                        <div class="bg-[url({{ Storage::url('/projects/game/ui/currency_yuan_FILL0_wght700_GRAD0_opsz48.svg') }})] bg-no-repeat bg-cover h-6 w-6 ml-0.5 invert drop-shadow min-h-[30px]"></div>
                        <div class="bg-[url({{ Storage::url('/projects/game/ui/safety_check_FILL0_wght700_GRAD0_opsz48.svg') }})] bg-contain h-8 w-8 ml-0.5 invert drop-shadow"></div>
                    </div>
                    <div class="h-full flex flex-col justify-center items-center ml-2">
                        <div>
                            <div class="text-white text-shadow min-h-[30px] h-4">
                                👋 {{ $this->player->name }}
                            </div>
                            <livewire:pinger :pingable="$this->player" />
                            <pre>@json($this->players)</pre>
                        </div>
                        <div class="bg-[url({{ Storage::url('/projects/game/ui/paintball.png') }})] bg-no-repeat bg-contain w-28 h-10">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute right-28 top-12 bg-transparent w-96 h-28 pt-2.5 pr-2.5">
            <div class="flex w-full h-full flex-col justify-end rounded shadow-md transform perspective-600 -rotate-y-45 -rotate-z-3" id="top-right-ui-area">
                <div class="w-full h-full flex flex-row justify-center items-end">
                    <img class="mt-1" src="{{ Storage::url('/projects/game/ui/ev_shadow_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <img class="mt-1" src="{{ Storage::url('/projects/game/ui/tenancy_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <img class="mt-1" src="{{ Storage::url('/projects/game/ui/fluorescent_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <img class="mt-1" src="{{ Storage::url('/projects/game/ui/database_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <img class="mt-1" src="{{ Storage::url('/projects/game/ui/barcode_scanner_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                </div>
            </div>
        </div>
        <div class="absolute top-48 bg-transparent w-96 h-28 rounded-xl">
            <div class="text-center" id="top-left-ui-area">
                <div class="w-full h-full flex flex-row justify-center items-end">
                    <img class="invert drop-shadow" src="{{ Storage::url('/projects/game/ui/double_arrow_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <div class="pt-2 pr-3 text-base text-white text-shadow-md">Kill'm all</div>
                </div>
                <div class="w-full h-full flex flex-row justify-center min-w-[400px] bg-gradient-to-r from-blue-300 via-transparent to-blue-900 items-center">
                    <img class="invert drop-shadow h-8" src="{{ Storage::url('/projects/game/ui/token_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    <div class="text-base ml-2 mr-2 text-gray-100 text-shadow">Jump around and stuff</div>
                </div>
            </div>
        </div>
    </div>
</div>