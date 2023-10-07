<?php

use \Illuminate\View\View;
use function Laravel\Folio\render;

render(static function (View $view) {
    $path = basename(__FILE__, '.blade.php');
    $splFileInfo = new SplFileInfo(__FILE__);

    return $view->with(    [
        'title' => Str::of($path)->replace('/', ' ')->headline(),
        'date' => [
            'time' => $splFileInfo->getCTime(),
            'label' => Date::parse($splFileInfo->getCTime())->toDayDateTimeString()
        ],
        'author' => [
            'image' => 'https://gravatar.com/avatar/d5570db0d14ecdc8b629e6d03507d577',
            'name' => 'Jonas Kervin Hansen',
            'role' => __('Developer')
        ],
        'description' => 'TODO'
    ]);
});
?>

<x-guest-layout>
    <section class="mx-auto max-w-7xl px-6 lg:px-8">
        <article class="mx-auto max-w-2xl lg:max-w-none mt-24 sm:mt-32 lg:mt-40">
                <header class="mx-auto flex max-w-5xl flex-col text-center">
                    <h1 class="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                        {{ $title }}
                    </h1>
                    <time
                        dateTime="{{ $date['time'] }}"
                        class="order-first text-sm text-neutral-950"
                    >
                        {{ $date['label'] }}
                    </time>
                    <p class="mt-6 text-sm font-semibold text-neutral-950">
                        {{ __('by :authorName, :authorRole', ['authorName' => $author['name'], 'authorRole' => $author['role']]) }}
                    </p>
                </header>

                <div class="mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
                    {{ $description }}
                </div>
        </article>
    </section>
</x-guest-layout>
