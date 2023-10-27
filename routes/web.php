<?php

use App\Http\Controllers\AppController;
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

Route::view('/projects', 'livewire.pages.projects.index')
    ->name('projects.index');

Volt::route('/projects/game', 'pages.projects.game.index')
    ->name('projects.game.index');

Volt::route('/projects/game/{gamer_tag}', 'pages.projects.game.[name]')
    ->name('projects.game.name');

Route::view('/dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

require __DIR__ . '/auth.php';
