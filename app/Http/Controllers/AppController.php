<?php

namespace App\Http\Controllers;

class AppController
{
    public function welcome()
    {
        return inertia('Welcome', [
            'navigation' => [
                // ['name' => 'Om', 'link' => route('about')],
                // ['name' => 'Kontakt', 'link' => route('contact')],
            ],
        ]);
    }
}
