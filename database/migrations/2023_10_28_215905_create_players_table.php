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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable()->constrained()->cascadeOnDelete();
            $table->string('name')->unique();
            $table->string('email')->nullable();
            $table->string('password');
            $table->string('remember_token')->nullable();
            $table->integer('health')->default(100);
            $table->integer('mana')->default(100);
            $table->decimal('x')->default(0);
            $table->decimal('y')->default(2);
            $table->decimal('z')->default(-1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
