<?php

namespace App\Livewire\Projects;

use Illuminate\Support\Facades\Redis;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Component;
use function array_map;
use function blank;
use function str_replace;


#[Layout('layouts.game')]
class Game extends Component
{
    const ROUTE = 'projects.game.play';
    public string $gamer_tag;

    public static function join(string $gamer_tag, array $coordinates = ['x' => 0, 'y' => 2, 'z' => -1])
    {
        $durationInSeconds = 300; // 5 minutes

        Redis::setex(
            "players:{$gamer_tag}",
            $durationInSeconds,
            [
                'coordinates' => $coordinates,
                'stats' => [
                    'health' => 100
                ]
            ]
        );
    }

    #[Computed]
    public function players()
    {
        $keys = [];

        $cursor = null;
        $pattern = "players:*";
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

        return $keys;
    }

    #[Computed]
    public function states()
    {
        return Redis::mget($this->players);
    }

    public function render()
    {
        return view('livewire.projects.game');
    }
}
