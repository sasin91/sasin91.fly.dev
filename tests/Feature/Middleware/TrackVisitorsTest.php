<?php

use function Pest\Laravel\get;

it('tracks a visitor', function () {
    get('/')
        ->assertSuccessful()
        ->assertCookie('visitor');
});
