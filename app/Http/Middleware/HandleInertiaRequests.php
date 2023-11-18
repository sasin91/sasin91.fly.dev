<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

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
                'locale' => app()->getLocale()
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
                            ? [
                                'id' => $request->user()->character->id,
                                'name' => $request->user()->character->name,
                                'health' => $request->user()->character->health,
                                'mana' => $request->user()->character->mana,
                                'position' => [
                                    $request->user()->character->position_x,
                                    $request->user()->character->position_y,
                                    $request->user()->character->position_z,
                                ],
                                'rotation' => [
                                    $request->user()->character->rotation_x,
                                    $request->user()->character->rotation_y,
                                    $request->user()->character->rotation_z,
                                ]
                            ]
                            : null 
                    ]
                    : null
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
