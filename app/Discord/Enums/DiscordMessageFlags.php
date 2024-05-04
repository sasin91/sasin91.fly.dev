<?php

namespace App\Discord\Enums;

enum DiscordMessageFlags: int
{
/**
 * CROSSPOSTED    1 << 0    this message has been published to subscribed channels (via Channel Following)
 * IS_CROSSPOST    1 << 1    this message originated from a message in another channel (via Channel Following)
 * SUPPRESS_EMBEDS    1 << 2    do not include any embeds when serializing this message
 * SOURCE_MESSAGE_DELETED    1 << 3    the source message for this crosspost has been deleted (via Channel Following)
 * URGENT    1 << 4    this message came from the urgent message system
 * HAS_THREAD    1 << 5    this message has an associated thread, with the same id as the message
 * EPHEMERAL    1 << 6    this message is only visible to the user who invoked the Interaction
 * LOADING    1 << 7    this message is an Interaction Response and the bot is "thinking"
 * FAILED_TO_MENTION_SOME_ROLES_IN_THREAD    1 << 8    this message failed to mention some roles and add their members to the thread
 * SUPPRESS_NOTIFICATIONS    1 << 12    this message will not trigger push and desktop notifications
 * IS_VOICE_MESSAGE    1 << 13    this message is a voice message
 */

    /**
     * this message has been published to subscribed channels (via Channel Following)
     */
    case CROSSPOSTED = 1 << 0;

    /**
     * this message originated from a message in another channel (via Channel Following)
     */
    case IS_CROSSPOST = 1 << 1;

    /**
     * do not include any embeds when serializing this message
     */
    case SUPPRESS_EMBEDS = 1 << 2;

    /**
     * the source message for this crosspost has been deleted (via Channel Following)
     */
    case SOURCE_MESSAGE_DELETED = 1 << 3;

    /**
     * this message came from the urgent message system
     */
    case URGENT = 1 << 4;

    /**
     * this message has an associated thread, with the same id as the message
     */
    case HAS_THREAD = 1 << 5;

    /**
     * this message is only visible to the user who invoked the Interaction
     */
    case EPHEMERAL = 1 << 6;

    /**
     * this message is an Interaction Response and the bot is "thinking"
     */
    case LOADING = 1 << 7;

    /**
     * this message failed to mention some roles and add their members to the thread
     */
    case FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 1 << 8;

    /**
     * this message will not trigger push and desktop notifications
     */
    case SUPPRESS_NOTIFICATIONS = 1 << 12;

    /**
     * this message is a voice message
     */
    case IS_VOICE_MESSAGE = 1 << 13;
}
