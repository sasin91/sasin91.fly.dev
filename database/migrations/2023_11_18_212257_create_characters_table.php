<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->float('health')->default(100);
            $table->float('mana')->default(100);
            $table->decimal('position_x')->default(0);
            $table->decimal('position_y')->default(2);
            $table->decimal('position_z')->default(-1);
            $table->decimal('rotation_x')->default(0);
            $table->decimal('rotation_y')->default(0);
            $table->decimal('rotation_z')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
