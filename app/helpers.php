<?php

use Illuminate\Contracts\Translation\Translator;
use Illuminate\Foundation\Application;

if (! function_exists('t')) {
    /**
     * Provides compatability with JSON translations used with vue-18n
     *
     * @return array|\Illuminate\Contracts\Foundation\Application|Translator|Application|string|null
     */
    function t(string $path, array $params = []): mixed
    {
        return __('*.'.$path, $params);
    }
}

if (! function_exists('json')) {
    function json(string $path) {
        $file = file_get_contents($path);
        $data = \json_decode($file, true);
        if (\json_last_error() !== \JSON_ERROR_NONE) {
            throw new \InvalidArgumentException('json_decode error: '.\json_last_error_msg());
        }

        return $data;
    }
}
