<?php

namespace App\Enums;

use Spatie\Permission\Models\Permission;

enum PermissionEnum: string
{
    use HasLabel;

    case PLAY_GAME = 'play game';
    case CARTE_BLANCHE = 'carte blanche';

    public function toModel(bool $create = false): Permission
    {
        return $create
            ? Permission::findOrCreate($this->value)
            : Permission::findByName($this->value);
    }

}
