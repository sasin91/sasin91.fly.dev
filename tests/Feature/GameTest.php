<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\withoutExceptionHandling;

test('it renders the game page', function () {
    withoutExceptionHandling();
    
    $response = actingAs(User::factory()->create())->get('/projects/game');

    $response
        ->assertSuccessful()
        ->assertInertia(function (AssertableInertia $page) {
            return $page->component('Projects/Game')
                ->has('assets', function (AssertableInertia $assets) {
                    $assets->has('root')
                        ->has('map')
                        ->has('character');
                });
        });
})->group('auth');
