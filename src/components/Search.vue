<script setup>
import { ref } from 'vue';

const searchTerm = ref('');

const emitSearch = defineEmits(['search']);

const updateSearchTerm = (event) => {
    searchTerm.value = event.target.value;
    emitSearch('search', searchTerm.value);
};

const clearSearchTerm = () => {
    searchTerm.value = '';
    emitSearch('search', '');
};
</script>

<template>
    <div class="w-full mx-auto px-4 pt-20 lg:pt-5">
        <div class="relative">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="text" 
                    id="voice-search" 
                    v-model="searchTerm"
                    @input="updateSearchTerm"
                    @keydown.enter="emitSearch('search', searchTerm.value)"
                    class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-none block w-full pl-10 pr-10 p-2.5"
                    placeholder="Search Thoughts..." />
                <button type="button" @click="clearSearchTerm"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                    aria-label="Clear search">
                    ✕
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>
