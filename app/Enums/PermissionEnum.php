<?php

namespace App\Enums;

use Spatie\Permission\Models\Permission;

enum PermissionEnum: string
{
    case PLAY_GAME = 'play game';
    case CARTE_BLANCHE = 'carte blanche';

    public function toModel(bool $create = false): Permission
    {
        return $create
            ? Permission::findOrCreate($this->value)
            : Permission::findByName($this->value);
    }

    public function label(): string
    {
        $key = sprintf('enums.%s.%s',
            static::class,
            $this->value
        );

        return __($key);
    }
}
