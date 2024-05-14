<?php

use App\Discord\DiscordSignature;

test('verifyED25519 passes', function () {
    $signatureEd25519 = "e565993424954287b232f2b00e6550d1e334157268a49560589c4aeacd69e8b676f51a7de4555c2f7f7caf887a6673b657baffd5024b392ceda7a168bb952a05";
    $signatureTimestamp = 1714928645;

    $signaturePayload = file_get_contents(
        base_path('/tests/__fixtures__/discord-signature.request.json')
    );

    $signature = new DiscordSignature($signatureEd25519, $signatureTimestamp, $signaturePayload);

    expect($signature->verifyED25519())->toBeTrue();
});

test('verifyWithSodium passes', function () {
    $signatureEd25519 = "e565993424954287b232f2b00e6550d1e334157268a49560589c4aeacd69e8b676f51a7de4555c2f7f7caf887a6673b657baffd5024b392ceda7a168bb952a05";
    $signatureTimestamp = 1714928645;

    $signaturePayload = file_get_contents(
        base_path('/tests/__fixtures__/discord-signature.request.json')
    );

    $signature = new DiscordSignature($signatureEd25519, $signatureTimestamp, $signaturePayload);

    expect($signature->verifyWithSodium())->toBeTrue();
});
