<?php

use \Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Finder\Finder;
use function Laravel\Folio\render;
use Illuminate\View\View;

render(function (View $view) {
    $views = Finder::create()
        ->in(__DIR__)
        ->name('*.blade.php')
        ->filter(function (SplFileInfo $splFileInfo) {
            return $splFileInfo->getFilename() !== 'index.blade.php';
        })
        ->files()
        ->getIterator();

    $articles = collect($views)->map(
        static function (SplFileInfo $splFileInfo) {
            $path = str_replace('.blade.php', '', $splFileInfo->getRelativePathname());

            return [
                'href' => url("/blog/$path"),
                'title' => Str::of($path)->replace('/', ' ')->headline(),
                'date' => [
                    'time' => $splFileInfo->getCTime(),
                    'label' => Date::parse($splFileInfo->getCTime())->toDateTimeLocalString()
                ],
                'author' => [
                    'image' => 'https://gravatar.com/avatar/d5570db0d14ecdc8b629e6d03507d577',
                    'name' => 'Jonas Kervin Hansen',
                    'role' => __('Developer')
                ],
                'description' => 'TODO'
            ];
        }
    );

    return $view->with('articles', $articles);
});
?>

<x-guest-layout>
    <section>
        <div
            class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-cyan-500/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"></div>
        <div class="mt-24 sm:mt-32 lg:mt-40 px-6 lg:px-8 mx-auto max-w-2xl lg:max-w-none">
            <div class="space-y-24 lg:space-y-32">
                @foreach($articles as $article)
                    <article>
                        <x-border class="pt-16">
                            <div class="relative lg:-mx-4 lg:flex lg:justify-end">
                                <div class="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                                    <h2 class="font-display text-2xl font-semibold text-neutral-950">
                                        <a href="{{ $article['href'] }}" wire:navigate.hover>{{ $article['title'] }}</a>
                                    </h2>
                                    <dl class="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                                        <dt class="sr-only">{{ __('Published') }}</dt>
                                        <dd class="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
                                            <time dateTime="{{ $article['date']['time'] }}">
                                                {{ $article['date']['label'] }}
                                            </time>
                                        </dd>
                                        <dt class="sr-only">{{ __('Author') }}</dt>
                                        <dd class="mt-6 flex gap-x-4">
                                            <div class="flex-none overflow-hidden rounded-xl bg-neutral-100">
                                                <Image
                                                    alt="{{ __('Avatar of {authorName}', ['authorName' => $article['author']['name']]) }}"
                                                    src="{{ $article['author']['image'] }}"
                                                    class="h-12 w-12 object-cover grayscale"
                                                />
                                            </div>
                                            <div class="text-sm text-neutral-950">
                                                <div class="font-semibold">
                                                    {{ $article['author']['name'] }}
                                                </div>
                                                <div>{{ $article['author']['role'] }}</div>
                                            </div>
                                        </dd>
                                    </dl>
                                    <p class="mt-6 max-w-2xl text-base text-neutral-600">
                                        {{ $article['description'] }}
                                    </p>
                                    <a
                                        wire:navigate.hover
                                        role="button"
                                        href="{{ $article['href'] }}"
                                        aria-label="{{ __('Read more: {articleTitle}', ['articleTitle' => $article['title']]) }}"
                                        class="mt-8"
                                    >
                                        {{ __('Read more') }}
                                    </a>
                                </div>
                            </div>
                        </x-border>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
</x-guest-layout>
