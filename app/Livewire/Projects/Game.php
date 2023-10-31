<?php

namespace App\Livewire\Projects;

use App\Events\PlayerCast;
use App\Events\PlayerMove;
use App\Events\PlayerOnline;
use App\Models\Player;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\On;
use Livewire\Component;

#[Layout('layouts.game')]
class Game extends Component
{
    const ROUTE = 'projects.game.play';

    public Player $player;

    public function mount()
    {
        $this->player = Auth::guard('player')->user();

        $this->player->update(['is_offline' => false]);

        Event::dispatch(new PlayerOnline($this->player));
    }

    #[On('player:move')]
    public function onMovement(int $x, int $y, int $z)
    {
        Event::dispatch(new PlayerMove(
            player: $this->player,
            x: $x,
            y: $y,
            z: $z
        ));

        $this->player->update([
            'x' => $x,
            'y' => $y,
            'z' => $z
        ]);
    }

    #[On('player:cast')]
    public function onCast(int $impulse, int $sphereIdx)
    {
        Event::dispatch(new PlayerCast(
            player: $this->player,
            impulse: $impulse,
            sphereIdx: $sphereIdx
        ));
    }

    public function render()
    {
        return view('livewire.projects.game', [
            'players' => Player::online()
                ->whereKeyNot($this->player)
                ->get(['name', 'health', 'mana', 'x', 'y', 'z'])
        ]);
    }
}
