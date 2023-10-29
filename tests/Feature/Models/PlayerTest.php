<?php

use App\Models\Ping;
use App\Models\Player;
use Illuminate\Support\Carbon;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertFalse;
use function PHPUnit\Framework\assertTrue;

it('lists the online players', function () {
    Carbon::setTestNow('2023-10-29 17:30:00');

    list($playerA, $playerB, $playerC, $playerD, $playerE) = Player::factory()->times(5)->create();

    Ping::factory()->for($playerA)->create(['created_at' => '2023-10-29 17:29:00']); // 1 min ago
    Ping::factory()->for($playerB)->create(['created_at' => '2023-10-29 17:25:00']); // 5 mins ago
    Ping::factory()->for($playerC)->create(['created_at' => '2023-10-29 17:21:00']); // 9 mins ago
    Ping::factory()->for($playerD)->create(['created_at' => '2023-10-29 17:20:00']); // 10 mins ago
    Ping::factory()->for($playerE)->create(['created_at' => '2023-10-29 17:19:00']); // 11 mins ago

    $results = Player::online()->get();

    assertCount(4, $results);
    assertTrue($results->contains($playerA));
    assertTrue($results->contains($playerB));
    assertTrue($results->contains($playerC));
    assertTrue($results->contains($playerD));
    assertFalse($results->contains($playerE));
});
