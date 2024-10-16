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
    <div class="lg:pt-5 pt-24 pr-5 pl-5">
        <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input
                type="text"
                id="voice-search"
                v-model="searchTerm"
                @input="updateSearchTerm"
                @keydown.enter="emitSearch('search', searchTerm.value)"
                class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-none block w-full ps-10 p-2.5"
                placeholder="Search Thoughts..."
            />
            <button
                type="button"
                @click="clearSearchTerm"
                class="absolute inset-y-0 end-0 flex items-center pr-3 text-gray-400"
                aria-label="Clear search"
            >
                ✕
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>
