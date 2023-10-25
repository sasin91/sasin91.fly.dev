<?php

use App\Livewire\Visitors;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;
use Livewire\Livewire;
use function Pest\Laravel\get;
use function Pest\Laravel\withCookie;

it('tracks visitors', function () {
    Redis::del(
        array_map(
            static fn($key) => str_replace('laravel_database_', '', $key),
            Redis::keys('visitors:*')
        )
    );

    get(route('welcome'))->assertSuccessful();

    Livewire::test(Visitors::class)->assertSet('visitors', 1);

    withCookie('visitor', Str::orderedUuid())->get(route('login'))->assertSuccessful();

    Livewire::test(Visitors::class)->assertSet('visitors', 2);
    Livewire::test(Visitors::class, ['route' => 'welcome'])->assertSet('visitors', 1);
    Livewire::test(Visitors::class, ['route' => 'login'])->assertSet('visitors', 1);
});
