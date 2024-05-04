<?php

namespace App\Domains\Projects\Game\Discord;

use App\Discord\Commands\DiscordCommand;
use App\Domains\Projects\Game\Discord\Game\AboutCommand;
use Illuminate\Http\Request;

class GameCommand extends DiscordCommand
{
    public function type(): int
    {
        return self::TYPE_CHAT_INPUT;
    }

    public function options(): array
    {
        return [
            AboutCommand::class
        ];
    }

    public function description(): ?string
    {
        return 'Game related commands';
    }

    public function content(Request $request): string
    {
        return 'Game command';
    }
}
