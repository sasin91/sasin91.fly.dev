<?php

use App\Http\Controllers\AppController;
use App\Http\Middleware\VerifyGamerTag;
use App\Livewire\Projects\Game;
use App\Livewire\Projects\GameLogin;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Volt::route('/', 'welcome')
    ->name('welcome');

Route::view('/projects', 'projects')
    ->name('projects.index');

Route::get('/projects/game', GameLogin::class)
    ->name(GameLogin::ROUTE);

Route::get('/projects/game/{gamer_tag}', Game::class)
    ->middleware(VerifyGamerTag::class)
    ->name(Game::ROUTE);

Route::view('/dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

require __DIR__ . '/auth.php';
