<?php

use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;

test('has a localized label', function (string $locale, $enum, string $expected) {
    app()->setLocale($locale);

    expect($enum->label())->toBe($expected);
})->with([
    ['en', RoleEnum::PLAYER, 'Player'],
//    ['en', RoleEnum::SUPER_ADMIN, 'Super Administrator'],
    ['da', RoleEnum::PLAYER, 'Spiller'],
//    ['da', RoleEnum::SUPER_ADMIN, 'Super Administrator'],
//    ['en', PermissionEnum::PLAY_GAME, 'Play Game'],
//    ['en', PermissionEnum::CARTE_BLANCHE, 'Carte Blanche'],
//    ['da', PermissionEnum::PLAY_GAME, 'Spille'],
//    ['da', PermissionEnum::CARTE_BLANCHE, 'Carte Blanche'],
]);
