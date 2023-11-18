<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\ResponseCache\Middlewares\CacheResponse;

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

Route::get('/', function () {
    return Inertia::render('Welcome');
})
    ->name('welcome')
    ->middleware(CacheResponse::class);

Route::get('/blog', function () {
    return Inertia::render('Blog');
})
    ->name('blog')
    ->middleware(CacheResponse::class);

Route::get('/projects', function () {
    return Inertia::render('Projects/Index');
})
    ->name('projects')
    ->middleware(CacheResponse::class);

Route::get('/projects/game', function () {
    return Inertia::render('Projects/Game');
})
    ->name('projects.game')
    ->middleware(CacheResponse::class);

Route::post('/contact-request', [ContactRequestController::class, 'store'])
    ->middleware([
        HandlePrecognitiveRequests::class,
        ThrottleRequests::with(maxAttempts: 15, decayMinutes: 1)
    ])
    ->name('contact-request.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->name('dashboard')
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
