<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Player extends Model implements Authenticatable
{
    use HasUuids;
    use \Illuminate\Auth\Authenticatable;
}
