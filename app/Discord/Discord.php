<?php

namespace App\Discord;

use App\Domains\Projects\Game\Discord\GameCommand;
use Illuminate\Http\Request;
use WeakMap;

class Discord
{
    public array $commands = [];

    public function __construct()
    {
        $this->commands[strtoupper(GameCommand::name())] = new GameCommand();
    }

    public function respondWithCommand(Request $request)
    {
        $commandName = strtoupper($request->json('data.name'));

        if (!isset($this->commands[$commandName])) {
            return response()->json(['content' => 'Command not found.'], 404);
        }

        $command = $this->commands[$commandName];

        return $command->toResponse($request);
    }

    public function registerCommands(): void
    {
        foreach ($this->commands as $command) {
            $command->register();
        }
    }
}
