<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Locale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (filled($request->query('locale'))) {
            ['locale' => $locale] = $request->validate(['locale' => ['required', 'string', 'in:en,da']]);

            $request->setLocale($locale);
            app()->setLocale($locale); 
        } 
        
        return $next($request);
    }
}
