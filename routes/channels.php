<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('game', function (User $user) {
    return [
        'id' => $user->id,
        'name' => $user->character->name,
        'health' => $user->character->health,
        'mana' => $user->character->mana,
        'position' => [
            'x' => $user->character->position_x,
            'y' => $user->character->position_y,
            'z' => $user->character->position_z
        ],
        'rotation' => [
            'x' => $user->character->rotation_x,
            'y' => $user->character->rotation_y,
            'z' => $user->character->rotation_z
        ]
    ];
});

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
