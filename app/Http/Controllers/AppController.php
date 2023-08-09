<?php

namespace App\Http\Controllers;

class AppController
{
    public function welcome()
    {
        return inertia('Welcome', [
            'navigation' => [
                // ['name' => 'About', 'href' => route('about')],
                // ['name' => 'Contact', 'href' => route('contact')],
                ['name' => 'Uses', 'href' => route('uses')],
                ['name' => 'Projects', 'href' => route('projects')]
            ],
        ]);
    }
}
