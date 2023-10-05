<?php

use App\Actions\SetApplicationLocale;
use App\Livewire\LocaleChanger;
use Livewire\Livewire;
use function Pest\Laravel\post;
use function PHPUnit\Framework\assertEquals;

it('renders successfully', function () {
    Livewire::test(LocaleChanger::class)
        ->assertStatus(200);
});

it('can change the locale', function () {
    app(SetApplicationLocale::class)->__invoke('da');

    Livewire::test(LocaleChanger::class)
        ->set('locale', 'en')
        ->call('onChange')
        ->assertRedirect();

    assertEquals('en', app()->getLocale());
    assertEquals('en', request()->getLocale());
});
