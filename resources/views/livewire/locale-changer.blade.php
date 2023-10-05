<label for="locale" class="block text-sm font-medium leading-6 text-gray-900">
    <select wire:model="locale"
            wire:change="onChange"
            id="locale"
            name="locale"
            class="mt-2 border-none bg-transparent py-1.5 pl-3 pr-10 block w-full border-l-4 border-transparent text-left text-base font-medium text-gray-600 transition-all duration-300 ease-in-out group sm:text-sm sm:leading-6">
        @foreach(config('app.available_locales') as $locale)
            <option
                class="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                @selected(config('app.locale') == $locale)
                value="{{ $locale }}"
            >
                {{ $locale }}
            </option>
        @endforeach
    </select>
</label>
