<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use function __;
use function abort_if;

class VerifyGamerTag
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $gamerTag = $request->string('name');

        if ($gamerTag->is($request->user()?->gamer_tag) === false) {
            abort_if(
                User::query()->where('gamer_tag', $gamerTag)->exists(),
                Response::HTTP_UNAUTHORIZED,
                __('Another user has that gamer tag. If that is you, log in.')
            );
        }

        return $next($request);
    }
}
