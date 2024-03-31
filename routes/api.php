<?php

use App\Http\Controllers\Api\DiscordInteractionController;
use App\Http\Middleware\VerifyDiscordSignature;
use Illuminate\Support\Facades\Route;

Route::middleware(VerifyDiscordSignature::class)->post('/discord', DiscordInteractionController::class);