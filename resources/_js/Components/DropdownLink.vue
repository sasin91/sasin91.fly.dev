<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    href: string;
}>();
</script>

<template>
    <Link :href="href"
        class="block w-full px-4 py-2 text-sm leading-5 text-left transition-all duration-300 ease-in-out group">
    <span
        class="text-cyan-500 group-hover:text-indigo-600 bg-left-bottom bg-gradient-to-r from-indigo-200 via-violet-400 to-cyan-200 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
        <slot />
    </span>
    </Link>
</template>
