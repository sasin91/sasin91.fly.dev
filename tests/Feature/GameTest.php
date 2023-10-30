<?php

use App\Livewire\Projects\Game;
use App\Livewire\Projects\GameLogin;
use App\Models\Player;
use Livewire\Livewire;

use function Pest\Laravel\assertAuthenticated;

it('creates a new player and logs into the game', function () {
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
