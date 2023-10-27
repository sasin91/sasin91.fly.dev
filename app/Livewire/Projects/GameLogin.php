<?php

namespace App\Livewire\Projects;

use App\Models\User;
use App\Rules\ValidGamerTag;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.guest')]
class GameLogin extends Component
{
    const ROUTE = 'projects.game.login';

    public string $gamer_tag;

    public function mount()
    {
        if (Auth::check()) {
            $this->gamer_tag = Auth::user()->gamer_tag;
        }
    }

    public function rules()
    {
        return [
            'gamer_tag' => [new ValidGamerTag(Auth::user() ?? User::class)]
        ];
    }

    public function submit()
    {
        $this->validate();

        Game::join($this->gamer_tag);

        $this->redirectRoute(Game::ROUTE, ['gamer_tag' => $this->gamer_tag]);
    }

    public function render()
    {
        return view('livewire.projects.game-login');
    }
}
