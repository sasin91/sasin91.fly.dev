<?php

use Illuminate\Contracts\Translation\Translator;
use Illuminate\Foundation\Application;

if (!function_exists('t')) {
    /**
     * Provides compatability with JSON translations used with vue-18n
     *
     * @param string $path
     * @param array $params
     * @return array|\Illuminate\Contracts\Foundation\Application|Translator|Application|string|null
     */
    function t(string $path, array $params = []): mixed
    {
        return __('*.'.$path, $params);
    }
}
