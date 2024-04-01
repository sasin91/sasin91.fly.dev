<?php use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;

return [
    RoleEnum::class => [
        RoleEnum::PLAYER->value => 'Spiller',
        RoleEnum::SUPER_ADMIN->value => 'Super Administrator'
    ],
    PermissionEnum::class => [
        PermissionEnum::PLAY_GAME->value => 'Spille',
        PermissionEnum::CARTE_BLANCHE->value => 'Carte Blanche'
    ]
];
