<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use function cookie;

class TrackVisitors
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $route = Route::currentRouteName() ?? '*';
        $visitor = $request->cookie('visitor');

        if (!$visitor) {
            $visitor = Str::orderedUuid()->__toString();
            $response->withCookie(cookie()->forever('visitor', $visitor));
        }

        $duration = 300; // This represents 5 minutes

        Redis::setex(
            "visitors:{$route}",
            $duration,
            $visitor
        );

        return $response;
    }
}
