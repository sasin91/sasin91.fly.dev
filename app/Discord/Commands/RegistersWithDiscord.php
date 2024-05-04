<?php

namespace App\Discord\Commands;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use InvalidArgumentException;
use RuntimeException;

trait RegistersWithDiscord
{
    abstract public function type(): int;
    abstract public function content(Request $request): string;

    public function applicationId(): string
    {
        return config('discord.application_id');
    }

    public static function name(): string
    {
        return str_replace(
            'Command',
            '',
            class_basename(static::class)
        );
    }

    public function description(): ?string
    {
        return null;
    }

    public function options(): array
    {
        return [];
    }

    public function client(): PendingRequest
    {
        return Http::asJson()->withToken(config('discord.token'), 'bot');
    }

    public function apiUrl(string $path): string
    {
        return sprintf(
            '%s/applications/%s/applications/%s',
            config('discord.api_url'),
            config('discord.application_id'),
            $path
        );
    }

    public function register(): void
    {
        $response = $this->client()->post(
            $this->apiUrl('commands'),
            $this->registerPayload()
        );

        if (!$response->ok()) {
            throw new RuntimeException($response->body(), $response->status());
        }
    }

    public function registerPayload(): array
    {
        $options = array_map(
            function ($option) {
                if (is_subclass_of($option, DiscordCommand::class)) {
                    return app($option)->registerPayload();
                }

                if (is_array($option)) {
                    return $option;
                }

                throw new InvalidArgumentException('Invalid option type');
            },
            $this->options()
        );

        $payload = [
            'type' => $this->type(),
            'name' => $this->name(),
            'description' => $this->description(),
            'application_id' => $this->applicationId(),
            'options' => !empty($options) ? $options : null,
        ];

        return array_filter($payload);
    }
}
