<?php

namespace App\Discord;

use Elliptic\EdDSA;

class DiscordSignature
{
    public static function verify(string $signature, int $timestamp, string $body, string $algorithm = 'ED25519'): bool
    {
        $discordSignature = new DiscordSignature($signature, $timestamp, $body);

        $method = 'verify' . $algorithm;
        return $discordSignature->$method();
    }

    /**
     * @var \Illuminate\Config\Repository|\Illuminate\Contracts\Foundation\Application|\Illuminate\Foundation\Application|mixed
     */
    private string $public_key;

    public function __construct(
        public readonly string $signature,
        public readonly int $timestamp,
        public readonly string $body
    )
    {
        $this->public_key = config('discord.public_key');
    }

    public function verifyED25519(): bool
    {
        $ec = new EdDSA('ed25519');
        $key = $ec->keyFromPublic($this->public_key, 'hex');

        $message = array_merge(unpack('C*', $this->timestamp), unpack('C*', $this->body));
        return $key->verify($message, $this->signature) == TRUE;
    }
    public function verifyWithSodium(): bool
    {
        $binary_signature = sodium_hex2bin($this->signature);
        $binary_key = sodium_hex2bin(config('discord.public_key'));
        $message = sprintf('%s%s', $this->timestamp, $this->body);

        return sodium_crypto_sign_verify_detached(
            $binary_signature,
            $message,
            $binary_key
        );
    }
}
