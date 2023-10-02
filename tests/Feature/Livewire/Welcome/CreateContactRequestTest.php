<?php

use App\Livewire\Welcome\CreateContactRequest;
use App\Models\ContactRequest;
use Livewire\Livewire;
use function Pest\Laravel\assertDatabaseHas;

it('renders successfully', function () {
    Livewire::test(CreateContactRequest::class)
        ->assertStatus(200);
});

it('creates a contact request', function () {
    Livewire::test(CreateContactRequest::class)
        ->set('companyName', 'hello world')
        ->set('contactPerson', 'jeeves')
        ->set('email', 'jeeves@mail.dk')
        ->set('phone', '70707070')
        ->set('message', 'hello')
        ->call('submit')
        ->assertCreated();

    assertDatabaseHas(ContactRequest::class, [
       'companyName' => 'hello world',
       'contactPerson' => 'jeeves',
       'email' => 'jeeves@mail.dk',
       'phone' => '70707070',
       'message' => 'hello'
    ]);
});
