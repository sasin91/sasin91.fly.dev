<?php

use App\Models\ContactRequest;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\postJson;

it('can submit a contact form', function () {
    $response = postJson(route('contact-request.store'), $params = [
        'companyName' => 'Test Company',
        'contactPerson' => 'Test Person',
        'email' => 'jonas.kerwin.hansen@gmail.com',
        'message' => 'hello world',
        'phone' => '+45 12345678',
    ]);

    $response->assertValid();

    assertDatabaseHas(ContactRequest::class, $params);
});