<script setup>
import { defineProps } from 'vue';

defineProps({
    bg: {
        type: String,
        default: 'bg-white'
    }
});
</script>

<template>
    <div :class="`${bg} rounded-xl p-8 pt-12 mb-8 shadow-sm`">
        <slot></slot>
    </div>
</template>