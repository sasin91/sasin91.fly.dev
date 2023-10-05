<?php

namespace App\Livewire;

use App\Actions\SetApplicationLocale;
use Livewire\Attributes\Rule;
use Livewire\Component;
use function app;
use function session;

class LocaleChanger extends Component
{
    #[Rule(['required', 'string', 'in:en,da'])]
    public string $locale;

    public function mount()
    {
        $this->locale = app()->getLocale();
    }

    public function onChange(SetApplicationLocale $setApplicationLocale)
    {
        $this->validate();

        $setApplicationLocale($this->locale);

        $this->redirect(
            session('url.intended', '/'),
            navigate: true
        );
    }

    public function render()
    {
        return view('livewire.locale-changer');
    }
}
