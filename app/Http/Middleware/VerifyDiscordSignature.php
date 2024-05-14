<?php

namespace App\Http\Middleware;

use App\Discord\DiscordSignature;
use App\Discord\Enums\DiscordRequestType;
use App\Discord\Enums\DiscordResponseType;
use Closure;
use Elliptic\EdDSA;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyDiscordSignature
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $signature = $request->header('X-Signature-Ed25519');
        $timestamp = $request->header('X-Signature-Timestamp');
        $body = $request->getContent();

        abort_if(
            !$signature || !$timestamp || !$body,
            400,
            sprintf(
                'Missing required headers: %s',
                implode(', ', array_filter([
                    !$signature ? 'X-Signature-Ed25519' : null,
                    !$timestamp ? 'X-Signature-Timestamp' : null,
                    !$body ? 'Request body' : null,
               ])))
        );

        $verified = DiscordSignature::verify(
            $signature,
            $timestamp,
            $body
        );

        if ($verified) {
            if ($request->json('type') === DiscordRequestType::PING->value) {
                return response()->json([
                    'type' => DiscordResponseType::PONG->value
                ]);
            }

            return $next($request);
        }

        abort(401, 'Failed to verify discord signature.');
    }
}
