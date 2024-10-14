<script setup>
import { defineProps } from 'vue';

defineProps({
    bg: {
        type: String,
        default: 'bg-white'
    },
    mb: {
        type: String,
        default: 'mb-8'
    }
});
</script>

<template>
    <div :class="`${bg} ${mb} border border-gray-300 lg:rounded-3xl p-8 shadow-sm`">
        <slot></slot>
    </div>
</template>