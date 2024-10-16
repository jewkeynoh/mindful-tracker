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
  <Search @search="updateSearchTerm" />
  <div class="lg:pt-5">
    <Thoughts :searchTerm="searchTerm" :saved="saved" />
  </div>
</template>
