<script setup>
import { defineProps } from 'vue';

defineProps({
    customClass: {
        type: String,
        default: ''
    },
    bg: {
        type: String,
        default: 'bg-white'
    },
    border: {
        type: String,
        default: 'lg:border lg:border-gray-300 lg:rounded-t-3xl'
    },
    shadow: {
        type: String,
        default: 'lg:shadow-sm'
    },
    screen: {
        type: String,
        default: 'h-screen h-full'
    },
    padding: {
        type: String,
        default: 'p-6'
    }
});
</script>

<template>
    <div :class="`${customClass} ${bg} ${border} ${padding} ${shadow} ${screen}`">
        <slot></slot>
    </div>
</template>