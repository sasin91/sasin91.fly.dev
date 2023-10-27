<?php

use App\Livewire\Projects\Game;
use App\Livewire\Projects\GameLogin;
use Livewire\Livewire;

it('logs a player into the game', function () {
    Livewire::test(GameLogin::class)
        ->set('gamer_tag', 'johnDoe')
        ->call('submit')
        ->assertHasNoErrors();
});

it('loads the game page and sees one other players', function () {
    Livewire::test(Game::class, ['gamer_tag' => 'johnDoe'])
        ->assertHasNoErrors();

    Livewire::test(Game::class, ['gamer_tag' => 'jessieDoe'])
        ->assertHasNoErrors()
        ->assertCount('players', 1);
});
