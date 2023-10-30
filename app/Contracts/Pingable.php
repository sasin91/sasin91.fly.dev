<?php

namespace App\Contracts;

use App\Models\Ping;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

interface Pingable
{
    public function ping(int $latency);

    public function latestPing(): HasOne;

    public function pings(): HasMany;
}
