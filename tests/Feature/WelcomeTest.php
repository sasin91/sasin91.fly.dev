<?php

use App\Models\ContactRequest;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('has welcome page', function () {
    $response = get(route('welcome'));

    $response->assertStatus(200);
});