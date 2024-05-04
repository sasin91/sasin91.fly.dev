<?php

namespace App\Providers;

use App\Discord\Discord;
use Illuminate\Support\ServiceProvider;

class DiscordServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(Discord::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // $this->app->make(Discord::class)->registerCommands();
    }
}
