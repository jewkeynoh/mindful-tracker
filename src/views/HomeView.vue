<script setup>
import Thoughts from '@/components/Thoughts.vue';
import { ref, defineProps } from 'vue';

const props = defineProps({
    thoughts: Array,
});
</script>

<template>
  <div class="lg:pt-12">
    <Thoughts :initialThoughts="thoughts" />
  </div>
</template>
