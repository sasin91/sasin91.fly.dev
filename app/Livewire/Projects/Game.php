<?php

namespace App\Livewire\Projects;

use App\Models\Player;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.game')]
class Game extends Component
{
    const ROUTE = 'projects.game.play';

    public Player $player;

    public function mount()
    {
        $this->player = Auth::guard('player')->user();
    }

    #[Computed]
    public function players()
    {
        return Player::online()
            ->whereKeyNot($this->player)
            ->get();
    }

    public function render()
    {
        return view('livewire.projects.game');
    }
}
