<script setup>
import Thoughts from '@/components/Thoughts.vue';
import { ref, defineProps } from 'vue';
import Search from '@/components/Search.vue';

// Reactive state for the search term
const searchTerm = ref('');
const saved = ref(true);

const props = defineProps({
  thoughts: Array,
});

// Method to handle search term update
const updateSearchTerm = (term) => {
  searchTerm.value = term;
};

</script>

<template>
  <div class="flex flex-col justify-center max-w-2xl">
    <Search @search="updateSearchTerm" />
    <Thoughts :searchTerm="searchTerm" :saved="saved" class="pt-6" />
  </div>
</template>
