<script setup>
import { ref } from 'vue';

// Reactive state for the search term
const searchTerm = ref('');

// Emit the search event
const emitSearch = defineEmits(['search']);

const updateSearchTerm = (event) => {
    searchTerm.value = event.target.value;
    console.log('Emitting search term:', searchTerm.value); // Log to verify if the search term is captured correctly
    emitSearch(searchTerm.value); // Emit the search term back to the parent
};
</script>

<template>
    <div class="pt-5 pr-5 pl-5">
        <form class="flex items-center mx-auto" @submit.prevent>
            <label for="voice-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="voice-search" v-model="searchTerm" @input="updateSearchTerm"
                    class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-none block w-full ps-10 p-2.5"
                    placeholder="Search Thoughts..." />
            </div>
            <button type="submit"
                class="transition ease-in-out duration-150 active:scale-95 text-white ms-2 bg-blue-800 hover:bg-blue-900 focus:outline-none font-medium rounded-3xl text-sm py-2.5 px-3">
                Search
            </button>
        </form>
    </div>
</template>
