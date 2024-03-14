<?php

namespace App\Http\Middleware;

use App\Http\Resources\CharacterResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'app' => [
                'name' => config('app.name'),
                'domain' => parse_url(config('app.url'), PHP_URL_HOST),
                'locale' => app()->getLocale(),
                'links' => [
                    [
                        'key' => 'welcome',
                        'href' => route('welcome'),
                        'label' => t('navigation.global.home'),
                        'active' => $request->routeIs('welcome'),
                    ],
                    [
                        'key' => 'blog',
                        'href' => route('blog'),
                        'label' => t('navigation.global.blog'),
                        'active' => $request->routeIs('blog.*'),
                    ],
                    [
                        'key' => 'projects',
                        'href' => route('projects'),
                        'label' => t('navigation.global.projects'),
                        'active' => $request->routeIs('projects.*'),
                    ],
                ]
            ],
            'auth' => [
                'user' => fn () => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                        'email_verified_at' => $request->user()->email_verified_at,
                        'is_admin' => $request->user()->isAdmin,
                        'character' => $request->user()->character
                            ? (new CharacterResource($request->user()->character))->toArray($request)
                            : null
                    ]
                    : null
            ],
            'ziggy' => fn () => [
                ...(new Ziggy())->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
