<?php

namespace App\Http\Controllers\Api;

use App\Discord\Commands\VBucks;
use App\Discord\Discord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\Log;

class DiscordInteractionController
{
    public function __invoke(Discord $discord, Request $request)
    {
        //$this->ensureCustomerExists($request);

        return $discord->respondWithCommand($request);
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
}
