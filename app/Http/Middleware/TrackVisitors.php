<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use function cookie;
use function trim;

class TrackVisitors
{
    /**
     * The URIs that should not be tracked.
     *
     * @var array<int, string>
     */
    protected $except = [
        'livewire/*'
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->inExceptArray($request)) {
            return $response;
        }

        $route = Route::currentRouteName() ?? '*';
        $visitor = $request->cookie('visitor');

        if (!$visitor) {
            $visitor = Str::orderedUuid()->__toString();
            $response->withCookie(cookie()->forever('visitor', $visitor));
        }

        $durationInSeconds = 5 * 60;

        Redis::setex(
            "visitors:{$visitor}",
            $durationInSeconds,
            $route
        );

        return $response;
    }

    protected function inExceptArray($request)
    {
        foreach ($this->except as $except) {
            if ($except !== '/') {
                $except = trim($except, '/');
            }

            if ($request->fullUrlIs($except) || $request->is($except)) {
                return true;
            }
        }

        return false;
    }
}
