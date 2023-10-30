<?php

namespace App\Models\Concerns;

use App\Models\Ping;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Request;

trait Pingable
{
    public function scopeWithLatestPingAt($query)
    {
        $query->addSelect([
            'lastest_ping_at' => Ping::select('created_at')
                ->whereColumn('player_id', 'players.id')
                ->latest()
                ->take(1)
        ])->withCasts(['lastest_ping_at' => 'datetime']);
    }


    public function latestPing(): HasOne
    {
        return $this->hasOne(Ping::class)->latestOfMany();
    }

    public function pings(): HasMany
    {
        return $this->hasMany(Ping::class);
    }

    public function ping(int $latency)
    {
        return $this->pings()->create([
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'latency' => $latency
        ]);
    }
}
