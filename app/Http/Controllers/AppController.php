<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController
{
    public function welcome()
    {
        return inertia('Welcome', [
            'navigation' => [
                // ['name' => 'About', 'href' => route('about')],
                // ['name' => 'Contact', 'href' => route('contact')],
                ['name' => 'uses', 'href' => route('uses')],
                ['name' => 'projects', 'href' => route('projects')]
            ],
        ]);
    }

    public function updateLocale(Request $request)
    {
        ['locale' => $locale] = $request->validate(['locale' => ['required', 'string', 'in:en,da']]);

        $request->setLocale($locale);
        app()->setLocale($locale);
        session()->put('locale', $locale);
    }
}
