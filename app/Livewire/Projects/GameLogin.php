<?php

namespace App\Livewire\Projects;

use App\Livewire\Projects\Game;
use App\Models\Player;
use App\Models\User;
use App\Rules\ValidGamerTag;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Layout;
use Livewire\Component;

#[Layout('layouts.guest')]
class GameLogin extends Component
{
    const ROUTE = 'projects.game.login';

    public string $name = '';
    public bool $remember = false;
    public string $password;

    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'password' => ['required', 'string', 'max:255'],
            'remember' => ['boolean']
        ];
    }

    public function submit()
    {
        $this->validate();

        $this->ensureIsNotRateLimited();

        $guard = Auth::guard('player');

        if (Player::query()->where('name', $this->name)->exists()) {
            if ($guard->attempt($this->only(['name', 'password'], $this->remember)) === false) {
                RateLimiter::hit($this->throttleKey());

                throw ValidationException::withMessages([
                    'name' => trans('auth.failed'),
                ]);
            }
        } else {
            $player = Player::create([
                'name' => $this->name,
                'password' => Hash::make($this->password)
            ]);

            $guard->login($player);
        }

        RateLimiter::clear($this->throttleKey());
        Session::regenerate();

        $this->redirectRoute(name: Game::ROUTE, navigate: true);
    }

    protected function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout(request()));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    protected function throttleKey(): string
    {
        return Str::transliterate('player:' . Str::lower($this->name) . '|' . request()->ip());
    }

    public function render()
    {
        return view('livewire.projects.game-login');
    }
}
