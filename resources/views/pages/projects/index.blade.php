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

    $projects = collect($views)->map(
        static function (SplFileInfo $splFileInfo) {
            $path = str_replace('.blade.php', '', $splFileInfo->getRelativePathname());

            return [
                'href' => url("/projects/$path"),
                'title' => Str::of($path)->replace('/', ' ')->headline(),
                'date' => [
                    'time' => $splFileInfo->getCTime(),
                    'label' => Date::parse($splFileInfo->getCTime())->diffForHumans()
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

    return $view->with('projects', $projects);
});

?>


<x-projects-layout>
    <article class="container mx-auto">
        <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ __('My projects') }}</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">{{ __('Sometimes a interesting & usually wacky idea crosses my mind, i may make a project out of it') }}</p>
        </div>
        <ul role="list"
            class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            @foreach($projects as $project)
                <a href="{{ $project['href'] }}" wire:navigate>
                    <img class="aspect-[3/2] w-full rounded-2xl object-cover"
                         src="{{ Storage::url('projects/tyler-van-der-hoeven-_ok8uVzL2gI-unsplash.jpg') }}"
                         alt="">
                    <h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ $project['title'] }}</h3>
                    <picture class="text-base leading-7 text-gray-600">✨</picture>
                </a>
            @endforeach
        </ul>
    </article>
</x-projects-layout>
