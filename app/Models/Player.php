<?php

namespace App\Models;

use App\Models\Concerns\HasPing;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Authenticatable as AuthAuthenticatable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\CausesActivity;

/**
 * @method static static online()
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Player extends Model implements Authenticatable
{
    use HasFactory;
    use AuthAuthenticatable;
    use LogsActivity, CausesActivity;
    use HasPing;

    protected $fillable = ['name', 'email', 'password'];

    public function scopeOnline(Builder $query, string $boundaryUnit = 'minute', int $boundaryValue = 10): void
    {
        $query->whereHas('latestPing', static function (Builder $query) use ($boundaryUnit, $boundaryValue): void {
            $now = new CarbonImmutable();

            $query->where('created_at', '>=', $now->sub($boundaryUnit, $boundaryValue));
        });
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('players')
            ->logOnly(['email', 'name', 'password']);
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
