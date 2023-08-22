<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\ContactRequestController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::post('/locale', [AppController::class, 'updateLocale'])->name('locale.change');
Route::get('/', [AppController::class, 'welcome'])->name('welcome');
Route::get('/about', [AppController::class, 'about'])->name('about');
Route::get('/contact', [AppController::class, 'contact'])->name('contact');
Route::get('/uses', [AppController::class, 'uses'])->name('uses');
Route::get('/projects', [AppController::class, 'projects'])->name('projects');
Route::post('/contact-request', [ContactRequestController::class, 'store'])
    ->middleware([
        HandlePrecognitiveRequests::class,
        ThrottleRequests::with(maxAttempts: 15, decayMinutes: 1)
    ])
    ->name('contact-request.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
