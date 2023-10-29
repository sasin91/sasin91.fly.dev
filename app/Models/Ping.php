<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ping extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent'
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
