<?php

use App\Livewire\Projects\Game;
use App\Livewire\Projects\GameLogin;
use App\Models\Player;
use Livewire\Livewire;

use function Pest\Laravel\assertAuthenticated;

it('logs a player into the game', function () {
    Player::factory()->create([
        'name' => 'johnDoe'
    ]);

    Livewire::test(GameLogin::class)
        ->set('name', 'johnDoe')
        ->set('password', 'password')
        ->call('submit')
        ->assertHasNoErrors();

    assertAuthenticated('player');
});

it('loads the game page and sees one other players', function () {
    Livewire::test(Game::class, ['gamer_tag' => 'johnDoe'])
        ->assertHasNoErrors();

    Livewire::test(Game::class, ['gamer_tag' => 'jessieDoe'])
        ->assertHasNoErrors()
        ->assertCount('players', 1);
});
