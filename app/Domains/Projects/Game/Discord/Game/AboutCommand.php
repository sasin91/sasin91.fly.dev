<?php

namespace App\Domains\Projects\Game\Discord\Game;

use App\Discord\Commands\DiscordCommand;
use Illuminate\Http\Request;

class AboutCommand extends DiscordCommand
{
    public function type(): int
    {
        return self::OPTION_TYPE_SUB_COMMAND;
    }

    public function description(): ?string
    {
        return 'Show information about the game';
    }

    public function content(Request $request): string
    {
        return "This game is something i made to experiment with three.js. It does not have any concrete goals or objectives.";
    }
}
