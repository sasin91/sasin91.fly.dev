<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController
{
    public function welcome()
    {
        return view('welcome')
            ->with('social', [
                [
                    'name' => 'Facebook',
                    'href' => 'https://www.facebook.com/jonaz.k.hansen',
                    'icon' => 'icons.facebook'
                ],
                [
                    'name' => 'Instagram',
                    'href' => 'https://www.instagram.com/jonaz.k.hansen/',
                    'icon' => 'icons.instagram'
                ],
                [
                    'name' => 'Twitter',
                    'href' => 'https://twitter.com/sasin91',
                    'icon' => 'icons.twitter'
                ],
                [
                    'name' => 'GitHub',
                    'href' => 'https://github.com/sasin91',
                    'icon' => 'icons.github'
                ],
                [
                    'name' => 'YouTube',
                    'href' => 'https://www.youtube.com/channel/UCxkb83un4xXdCYXPucs_ceA',
                    'icon' => 'icons.youtube'
                ],
            ])
            ->with('timeline', [
                [
                    'name' => ('timeline.webintegrator.name'),
                    'description' => ('timeline.webintegrator.description'),
                    'date' => 'Aug 2015',
                    'dateTime' => '2015-08',
                ],
                [
                    'name' => ('timeline.ghc.name'),
                    'description' => ('timeline.ghc.description'),
                    'date' => 'Feb 2017',
                    'dateTime' => '2017-02',
                ],
                [
                    'name' => ('timeline.syncronet.name'),
                    'href' => 'https://zometv.com',
                    'description' => ('timeline.syncronet.description'),
                    'date' => 'Feb 2020',
                    'dateTime' => '2020-02',
                ],
                [
                    'name' => ('timeline.juice.name'),
                    'href' => 'https://morejuice.io',
                    'description' => ('timeline.juice.description'),
                    'date' => 'Jan 2023',
                    'dateTime' => '2023-01',
                ]
            ])
            ->with('features', [
                [
                    'name' => ('features.servers.name'),
                    'description' => ('features.servers.description'),
                    'icon' => 'heroicon-s-cloud-arrow-up',
                ],
                [
                    'name' => ('features.security.name'),
                    'description' => ('features.security.description'),
                    'icon' => 'heroicon-o-lock-open',
                ],
                [
                    'name' => ('features.backend_development.name'),
                    'description' => ('features.backend_development.description'),
                    'icon' => 'heroicon-s-cog',
                ],
                [
                    'name' => ('features.automated_testing.name'),
                    'description' => ('features.automated_testing.description'),
                    'icon' => 'heroicon-s-shield-check',
                ],
                [
                    'name' => ('features.databases.name'),
                    'description' => ('features.databases.description'),
                    'icon' => 'heroicon-s-server-stack',
                ],
                [
                    'name' => ('features.frontend_development.name'),
                    'description' => ('features.frontend_development.description'),
                    'icon' => 'heroicon-s-arrow-path',
                ],
                [
                    'name' => ('features.app_development.name'),
                    'description' => ('features.app_development.description'),
                    'icon' => 'heroicon-s-cursor-arrow-rays'
                ],
                [
                    'name' => ('features.vcs.name'),
                    'description' => ('features.vcs.description'),
                    'icon' => 'heroicon-s-clipboard-document-check',
                ],
                [
                    'name' => ('features.backups.name'),
                    'description' => ('features.backups.description'),
                    'icon' => 'heroicon-s-document-duplicate',
                ],
            ]);
    }

    public function updateLocale(Request $request)
    {
        ['locale' => $locale] = $request->validate(['locale' => ['required', 'string', 'in:en,da']]);

        $request->setLocale($locale);
        app()->setLocale($locale);
        session()->put('locale', $locale);

        return back();
    }
}
