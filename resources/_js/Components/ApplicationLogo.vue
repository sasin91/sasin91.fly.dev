<template>
    <AdvancedImage :cldImg="myImg" :plugins="[responsive, placeholder, lazyload]" />
</template>

<script setup lang="ts">
import { injectCloudinary } from '@/Plugins/Cloudinary';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { AdvancedImage, responsive, placeholder, lazyload } from "@cloudinary/vue";

const { width, height, radius } = defineProps({
    width: {
        type: Number,
        default: 64,
    },
    height: {
        type: Number,
        default: 64,
    },
    radius: {
        type: Number,
        default: 25,
    },
})

const cld = injectCloudinary();

const myImg = cld.image("Emne_amvmxw");

myImg
    .resize(fill().width(width).height(height))
    .roundCorners(byRadius(radius))
    ;

</script>