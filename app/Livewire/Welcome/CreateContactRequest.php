<?php

namespace App\Livewire\Welcome;

use App\Models\ContactRequest;
use Livewire\Attributes\Rule;
use Livewire\Component;

class CreateContactRequest extends Component
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

    public function submit()
    {
        $this->authorize('create', ContactRequest::class);

        $validated = $this->validate();

        $contactRequest = new ContactRequest($validated);
        $contactRequest->saveOrFail();

        $this->dispatch('open-modal', 'contact-form-success-modal');
    }

    public function render()
    {
        return view('livewire.welcome.create-contact-request');
    }
}
