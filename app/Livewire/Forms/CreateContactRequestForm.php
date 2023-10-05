<?php

namespace App\Livewire\Forms;

use App\Models\ContactRequest;
use Livewire\Attributes\Rule;
use Livewire\Form;

class CreateContactRequestForm extends Form
{
    #[Rule(['required', 'string', 'max:255'])]
    public string $companyName;

    #[Rule(['required', 'string', 'max:255'])]
    public string $contactPerson;

    #[Rule(['required', 'email:rfc,dns', 'max:255'])]
    public string $email;

    #[Rule(['required', 'string', 'max:255'])]
    public string $phone;

    #[Rule(['required', 'string'])]
    public string $message;

    public function store()
    {
        $contactRequest = new ContactRequest($this->validate());
        $contactRequest->saveOrFail();

        return $contactRequest;
    }
}
