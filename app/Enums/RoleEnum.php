<?php

namespace App\Enums;

use Spatie\Permission\Models\Role;

enum RoleEnum: string
{
    case PLAYER = 'player';
    case SUPER_ADMIN = 'super-admin';

    public function toModel(bool $create = false): Role
    {
        return $create
            ? Role::findOrCreate($this->value)
            : Role::findByName($this->value);
    }

    public function label(): string
    {
        $key = sprintf('enums.%s.%s',
            static::class,
            $this->value
        );

        return __($key);
    }

    public function permissions()
    {
        return match ($this) {
            static::PLAYER => [
                PermissionEnum::PLAY_GAME
            ],
            static::SUPER_ADMIN => [
                PermissionEnum::CARTE_BLANCHE
            ],
        };
    }
}
