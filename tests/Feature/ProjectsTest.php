<?php

use Inertia\Testing\AssertableInertia;

test('it renders the projects index page', function () {
    $response = $this->get('/projects');

    $response->assertInertia(function (AssertableInertia $page) {
        return $page->component('Projects/Index');
    });
});