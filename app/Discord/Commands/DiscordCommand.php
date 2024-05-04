<?php

namespace App\Discord\Commands;

use Illuminate\Contracts\Support\Responsable;

abstract class DiscordCommand implements Responsable
{
    use RegistersWithDiscord;
    use RespondsToWebhooks;

    /**
     * The available types of application commands
     *
     * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
     */
    public const TYPE_CHAT_INPUT = 1;

    public const TYPE_USER = 2;

    public const TYPE_MESSAGE = 3;

    /**
     * The available command option types
     *
     * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
     */
    public const OPTION_TYPE_SUB_COMMAND = 1;

    public const OPTION_TYPE_SUB_COMMAND_GROUP = 2;

    public const OPTION_TYPE_STRING = 3;

    public const OPTION_TYPE_INTEGER = 4;

    public const OPTION_TYPE_BOOLEAN = 5;

    public const OPTION_TYPE_USER = 6;

    public const OPTION_TYPE_CHANNEL = 7;

    public const OPTION_TYPE_ROLE = 8;

    public const OPTION_TYPE_MENTIONABLE = 9;

    public const OPTION_TYPE_NUMBER = 10;

    public const OPTION_TYPE_ATTACHMENT = 11;

    /**
     * The available response types
     *
     * @see https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object
     */
    public const RESPONSE_TYPE_PONG = 1;

    public const RESPONSE_TYPE_CHANNEL_MESSAGE_WITH_SOURCE = 4;

    public const RESPONSE_TYPE_DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5;

    public const RESPONSE_TYPE_DEFERRED_UPDATE_MESSAGE = 6;

    public const RESPONSE_TYPE_UPDATE_MESSAGE = 7;

    public const RESPONSE_TYPE_APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8;

    public const RESPONSE_TYPE_MODAL = 9;
}
