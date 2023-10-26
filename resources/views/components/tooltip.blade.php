@props(['align' => 'bottom'])

@php
    switch ($align) {
        case 'left':
            $alignmentClasses = 'origin-top-left left-0';
            break;
        case 'top':
            $alignmentClasses = 'origin-top';
            break;
        case 'right':
            $alignmentClasses = 'origin-top-right right-0';
            break;
        case 'bottom':
            $alignmentClasses = 'origin-bottom';
    }
@endphp

<div {{ $attributes->merge(['class' => 'group flex relative']) }}>
    {{ $slot }}
    <span class="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto {{ $alignmentClasses }}">
        {{ $content }}
    </span>
</div>
