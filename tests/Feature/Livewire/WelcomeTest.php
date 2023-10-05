<?php

use App\Models\ContactRequest;
use Livewire\Livewire;

use Livewire\Volt\Volt;
use function Pest\Laravel\assertDatabaseHas;

it('renders successfully', function () {
    Volt::test('welcome')
        ->assertStatus(200);
});

it('creates a contact request', function () {
    Volt::test('welcome')
        ->set('contactForm.companyName', 'hello world')
        ->set('contactForm.contactPerson', 'jeeves')
        ->set('contactForm.email', 'jeeves@mail.dk')
        ->set('contactForm.phone', '70707070')
        ->set('contactForm.message', 'hello')
        ->call('submit')
        ->assertHasNoErrors();

    assertDatabaseHas(ContactRequest::class, [
        'companyName' => 'hello world',
        'contactPerson' => 'jeeves',
        'email' => 'jeeves@mail.dk',
        'phone' => '70707070',
        'message' => 'hello',
    ]);
});
