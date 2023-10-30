<?php

use App\Livewire\Pinger;
use App\Models\Player;
use Livewire\Livewire;

it('renders successfully', function () {
    $pingable = Player::factory()->create();

    Livewire::test(Pinger::class, ['pingable' => $pingable])
        ->assertStatus(200);
});