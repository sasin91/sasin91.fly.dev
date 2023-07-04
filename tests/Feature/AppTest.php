<?php

use App\Models\ContactRequest;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('has welcome page', function () {
    $response = get(route('welcome'));

    $response->assertStatus(200);
});

it('can submit a contact form', function () {
    $response = post(route('contact-request.store'), $params = [
        'companyName' => 'Test Company',
        'contactPerson' => 'Test Person',
        'email' => 'jonas.kerwin.hansen@gmail.com',
        'message' => 'hello world',
        'phone' => '+45 12345678',
    ]);

    $response->assertValid();

    $response->assertRedirect(route('welcome'));

    assertDatabaseHas(ContactRequest::class, $params);
});
