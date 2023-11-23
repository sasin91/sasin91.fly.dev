<?php

use App\Models\Character;
use App\Models\User;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\be;
use function Pest\Laravel\postJson;

it('can create a new character', function () {
    be($user = User::factory()->create());

    $response = postJson(route('character.store'), [
        'name' => 'Hubert'
    ]);

    $response->assertValid();

    assertDatabaseHas(Character::class, [
        'user_id' => $user->id,
        'name' => 'Hubert'
    ]);
});
