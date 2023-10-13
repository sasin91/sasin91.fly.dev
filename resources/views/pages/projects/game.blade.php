@push('scripts')
    @vite('resources/js/projects/game/index.ts')

    <script defer>
        document.addEventListener('DOMContentLoaded', function () {
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
@endpush

<x-guest-layout>
    <div id="container" class="mt-4">
        <div class="ui" id="game-ui">
            <div class="left-ui">
                <div class="ui-area ui-glow left-ui-area" id="left-ui-area">
                    <div class="row">
                        <div class="column">
                            <div class="charge-text" id="charge-text">100%</div>
                            <div class="health-text" id="health-text">100</div>
                        </div>
                        <div class="column">
                            <div class="charge-icon charge-icon-main"></div>
                            <div class="health-icon health-icon-main"></div>
                        </div>
                        <div class="column">
                            <div class="charge-bar">
                                <div class="charge-bar-active" id="charge-bar"></div>
                            </div>
                            <div class="health-bar">
                                <div class="health-bar-active"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-ui">
                <div class="ui-area ui-glow right-ui-area" id="right-ui-area">
                    <div class="row">
                        <div class="column weapon-area">
                            <div class="weapon-text weapon-top-row"></div>
                            <div class="weapon-pic-text">25</div>
                        </div>
                        <div class="column weapon-area">
                            <div class="weapon-text-icon weapon-top-row"></div>
                            <div class="weapon-pic-icon"></div>
                        </div>
                        <div class="column weapon-area">
                            <div class="weapon-text weapon-top-row">FPS game</div>
                            <div class="weapon-icon">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="top-right-ui">
                <div class="ui-area ui-glow top-right-ui-area" id="top-right-ui-area">
                    <div class="ammo-area row">
                        <img class="ammo-icon" src="{{ Storage::url('/projects/game/ui/ev_shadow_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <img class="ammo-icon" src="{{ Storage::url('/projects/game/ui/tenancy_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <img class="ammo-icon" src="{{ Storage::url('/projects/game/ui/fluorescent_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <img class="ammo-icon" src="{{ Storage::url('/projects/game/ui/database_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <img class="ammo-icon"
                             src="{{ Storage::url('/projects/game/ui/barcode_scanner_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                    </div>
                </div>
            </div>
            <div class="top-left-ui">
                <div class="top-left-ui-area" id="top-left-ui-area">
                    <div class="row">
                        <img class="objective-title-icon"
                             src="{{ Storage::url('/projects/game/ui/double_arrow_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <div class="objective-title">Kill'm all</div>
                    </div>
                    <div class="row objective-text-background">
                        <img class="objective-text-icon"
                             src="{{ Storage::url('/projects/game/ui/token_FILL0_wght700_GRAD0_opsz48.svg') }}"></img>
                        <div class="objective-text">Jump around and stuff</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <x-slot:footer>
        <!-- empty -->
    </x-slot:footer>
</x-guest-layout>
