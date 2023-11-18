<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class LocaleController
{
    public function __invoke(Request $request, ?string $locale = null)
    {
        $validated = $request
            ->whenMissing(
                'locale',
                static fn () => $request->merge(['locale' => $locale])
            )
            ->validate(['locale' => ['required', 'string', 'in:en,da']]);

        $request->setLocale($validated['locale']);
        App::setLocale($validated['locale']);
        Session::put('locale', $validated['locale']);

        return Redirect::back();
    }
}
