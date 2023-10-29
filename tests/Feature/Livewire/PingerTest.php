<?php

namespace Tests\Feature\Livewire;

use App\Livewire\Pinger;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Livewire\Livewire;
use Tests\TestCase;

class PingerTest extends TestCase
{
    /** @test */
    public function renders_successfully()
    {
        Livewire::test(Pinger::class)
            ->assertStatus(200);
    }
}
