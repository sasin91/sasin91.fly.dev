<?php

namespace App\Console\Commands;

use App\Events\PlayerOffline;
use App\Models\Player;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Event;

class PlayerDisconnectIdleCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'player:disconnect-idle';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Disconnect players that is no longer online';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        foreach (Player::idle()->cursor() as $player) {
            $player->update(['is_offline' => true]);
            Event::dispatch(new PlayerOffline($player));
        }
    }
}
