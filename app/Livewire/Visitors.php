<?php

namespace App\Livewire;

use Illuminate\Support\Facades\Redis;
use Livewire\Attributes\Computed;
use Livewire\Component;
use function array_map;
use function array_unique;
use function str_replace;

class Visitors extends Component
{
    public string $route = '*';

    #[Computed]
    public function visitors()
    {
        $keys = [];

        if ($this->route === '*') {
            $cursor = null;
            $pattern = "visitors:*";
            $batchSize = 1000;

            do {
                list($cursor, $values) = Redis::scan($cursor, $pattern, $batchSize);

                if ($values) {
                    $keys += array_map(
                        fn($key) => str_replace('laravel_database_', '', $key),
                        $values
                    );
                }
            } while ($cursor !== 0);
        } else {
            $keys = ["visitors:{$this->route}"];
        }

        $visitorUuids = Redis::mget(
            array_unique($keys)
        );

        return count($visitorUuids);
    }

    public function render()
    {
        return view('livewire.visitors');
    }
}
