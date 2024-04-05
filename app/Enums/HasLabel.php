<?php

namespace App\Enums;

trait HasLabel
{

    public function label(): string
    {
        $key = sprintf('enums.%s.%s',
            static::class,
            $this->value
        );

        return __($key);
    }
}
