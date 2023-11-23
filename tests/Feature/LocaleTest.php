<?php

use function Pest\Laravel\followingRedirects;
use function PHPUnit\Framework\assertEquals;

it('can change locale', function () {
    $response = followingRedirects()->get('?locale=en');

    $response->assertOk();

    assertEquals('en', app()->getLocale());
    
    $response->assertSee(t('app.description'));
});
