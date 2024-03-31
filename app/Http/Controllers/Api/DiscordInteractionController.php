<?php

namespace App\Http\Controllers\Api;

use App\Disord\Commands\VBucks;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Log;

class DiscordInteractionController
{
    public function __invoke(Request $request)
    {
        //$this->ensureCustomerExists($request);

        return match ($request->json('data.name')) {
            default => $this->notifyDevsAboutUnexpectedCommand($request)
        };
    }

    private function ensureCustomerExists(Request $request)
    {
        $discordUser = $request->json('member.user', []);

        if (filled($discordUser) && User::query()->where('discord_id', $discordUser)->doesntExist()) {
            User::factory()->create([
                'discord_id' => $discordUser['id'],
                'name' => $discordUser['global_name'],
                'avatar' => sprintf(
                    'https://cdn.discordapp.com/avatars/%s/%s.%s',
                    $discordUser['id'],
                    $discordUser['avatar'],
                    preg_match('/a_.+/m', $discordUser['avatar']) === 1
                        ? 'gif'
                        : 'jpg'
                ),
            ]);
        }
    }

    private function notifyDevsAboutUnexpectedCommand(Request $request)
    {
        Context::add('payload', $request->json()->all());

        Log::info("Received unhandled discord command [{$request->json('data.name')}]");

        return new Response('Command not found.', 404);
    }
}
