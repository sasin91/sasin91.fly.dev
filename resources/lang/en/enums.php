<?php use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;

return [
    RoleEnum::class => [
        RoleEnum::PLAYER->value => 'Player',
        RoleEnum::SUPER_ADMIN->value => 'Super Administrator'
    ],
    PermissionEnum::class => [
        PermissionEnum::PLAY_GAME->value => 'Play Game',
        PermissionEnum::CARTE_BLANCHE->value => 'Carte Blanche'
    ]
];
