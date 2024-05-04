<?php

use App\Http\Middleware\VerifyDiscordSignature;

use function Pest\Laravel\withoutExceptionHandling;
use function Pest\Laravel\withoutMiddleware;

it('handles a slash command', function ($data) {
    withoutExceptionHandling();

    $response = withoutMiddleware(VerifyDiscordSignature::class)->postJson(
        '/api/discord',
        $data
    );

    $response->assertOk();

    $content = $response->json('data.content');

    expect($content)->toBe('Game command');
})->with([
    function () {
        $json = file_get_contents(base_path('/tests/__fixtures__/discord.slash-command.json'));
        $data = \json_decode($json, true);
        if (\json_last_error() !== \JSON_ERROR_NONE) {
            throw new \InvalidArgumentException('json_decode error: '.\json_last_error_msg());
        }

        $data['data']['name'] = 'game';
        $data['data']['options'][0] = [
            'name' => 'about',
            'type' => 1,
            'value' => 'game',
        ];

        return $data;
    },
]);
