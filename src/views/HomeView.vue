<script setup>
import Thoughts from '@/components/Thoughts.vue';
import { ref, defineProps, computed } from 'vue';
import Search from '@/components/Search.vue';

// Props for initial thoughts
const props = defineProps({
    thoughts: Array,
});

// Reactive state for the search term
const searchTerm = ref('');

// Computed property to filter thoughts based on the search term
const filteredThoughts = computed(() => {
    if (!searchTerm.value) return props.thoughts;
    return props.thoughts.filter(thought => {
        return thought.thought.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
});

// Method to handle search term update
const updateSearchTerm = (term) => {
    searchTerm.value = term;
};
</script>

<template>
  <Search @search="updateSearchTerm" />
  <div class="lg:pt-5">
    <Thoughts :initialThoughts="filteredThoughts" :searchTerm="searchTerm" />
  </div>
</template>
