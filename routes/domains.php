<?php

use App\Domains\Projects\Controllers\CharacterController;
use App\Domains\Projects\Controllers\GameController;
use App\Domains\Projects\Controllers\ProjectsController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

Route::get('/projects', [ProjectsController::class, 'index'])
    ->name('projects');

Route::get('/projects/game', GameController::class)
    ->name('projects.game')
    ->middleware('auth');

Route::post('/character', [CharacterController::class, 'store'])
    ->middleware(HandlePrecognitiveRequests::class)
    ->name('character.store');
