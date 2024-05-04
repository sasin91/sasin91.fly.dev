<?php

namespace App\Discord\Commands;

use App\Discord\Enums\DiscordMessageFlags;
use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

trait RespondsToWebhooks
{
    private ?User $user = null;

    public array $flags = [];

    public function user(Request $request): User|Model|null
    {
        return $this->user ??= User::query()->where('discord_id', $this->memberUserId($request))->first();
    }

    public function option(Request $request, Closure $predicate, $default = null)
    {
        return $request
            ->collect('data.options')
            ->firstWhere($predicate) ?? $default;
    }

    public function toResponse($request): JsonResponse|Response
    {
        return response()->json([
            'type' => DiscordCommand::RESPONSE_TYPE_CHANNEL_MESSAGE_WITH_SOURCE,
            'data' => [
                'content' => $this->content($request),
                'flags' => $this->flags($request),
            ],
        ]);
    }

    public function memberUserId(Request $request): ?string
    {
        return $request->string('member.user.id');
    }

    public function flags(Request $request): int
    {
        return array_reduce(
            $this->flags,
            fn(DiscordMessageFlags $flag, int $flags) => $flags & $flag->value,
            0
        );
    }
}
