<?php

namespace App\Actions;

use function app;
use function request;
use function session;

class SetApplicationLocale
{
    public function __invoke(string $locale): void
    {
        request()->setLocale($locale);
        app()->setLocale($locale);
        session()->put('locale', $locale);
    }
}
