<?php

namespace App\Livewire;

use App\Models\Player;
use Illuminate\Database\Eloquent\Model;
use Livewire\Attributes\Computed;
use Livewire\Component;

class Pinger extends Component
{
    public Player $pingable;

    public int $latency = 0;

    public function mount()
    {
        $this->latency = (int)$this->pingable->latestPing()->value('latency');
    }

    /**
     * I just met you, and this is crazy, but here's my address so ping me maybe
     *
     * @return void
     */
    public function ping(int $clientTime)
    {
        $this->latency = abs($clientTime - round((time() * 1000), 4));

        $this->pingable->ping($this->latency);
    }

    public function render()
    {
        return view('livewire.pinger');
    }
}
