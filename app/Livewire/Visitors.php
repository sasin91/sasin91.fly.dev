<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Redis;
use Livewire\Attributes\Computed;
use Livewire\Component;
use function array_map;
use function blank;
use function collect;
use function count;
use function str_replace;

class Visitors extends Component
{
    public string $route = '*';

    #[Computed]
    public function visitors()
    {
        $keys = [];

        $cursor = null;
        $pattern = "visitors:*";
        $batchSize = 1000;

        do {
            list($cursor, $values) = Redis::scan($cursor, $pattern, $batchSize);

            if (blank($values)) {
                break;
            }

            $keys += array_map(
                fn($key) => str_replace('laravel_database_', '', $key),
                $values
            );
        } while ($cursor !== 0);

        if ($this->route === '*') {
            return count($keys);
        }

        return collect(Redis::mget($keys))
            ->filter(fn(string $route) => $route === $this->route)
            ->count();
    }

    public function render()
    {
        return view('livewire.visitors');
    }
}
