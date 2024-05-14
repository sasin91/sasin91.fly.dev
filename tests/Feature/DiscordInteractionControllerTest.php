<?php

use App\Http\Middleware\VerifyDiscordSignature;

use function Pest\Laravel\postJson;
use function Pest\Laravel\withoutExceptionHandling;
use function Pest\Laravel\withoutMiddleware;

it('verifies the discord signature', function () {
    $signatureEd25519 = "e565993424954287b232f2b00e6550d1e334157268a49560589c4aeacd69e8b676f51a7de4555c2f7f7caf887a6673b657baffd5024b392ceda7a168bb952a05";
    $signatureTimestamp = 1714928645;

    $signaturePayload = json(
        base_path('/tests/__fixtures__/discord-signature.request.json')
    );

    postJson('/api/discord', $signaturePayload, [
        'X-Signature-Ed25519' => $signatureEd25519,
        'X-Signature-Timestamp' => $signatureTimestamp,
    ])->assertOk();
});

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
        $data = json(
            base_path('/tests/__fixtures__/discord.slash-command.json')
        );

        $data['data']['name'] = 'game';
        $data['data']['options'][0] = [
            'name' => 'about',
            'type' => 1,
            'value' => 'game',
        ];

        return $data;
    },
]);
