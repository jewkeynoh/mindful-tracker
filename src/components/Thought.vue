<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
    thought: Object,
    isDropdownOpen: Boolean,
    toggleDropdown: Function,
    showDeleteModal: Function,
    searchTerm: String,
});

const showFullThought = ref(false);

// Compute truncated thought text
const truncatedThought = computed(() => {
    const thoughtText = props.thought.thought;
    if (!showFullThought.value) {
        return thoughtText.length > 90 ? thoughtText.substring(0, 90) + '...' : thoughtText;
    }
    return thoughtText;
});

// Compute highlighted thought text
const highlightedThought = computed(() => {
    const thoughtText = props.thought.thought;
    if (!props.searchTerm) return truncatedThought.value; // If no search term, return truncated thought

    // Escape special characters in the search term to prevent regex errors
    const escapedSearchTerm = props.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi'); // Create a regex for highlighting

    // Highlight matched text
    const highlighted = thoughtText.replace(regex, '<span style="background:yellow;">$1</span>');

    return highlighted; // Return highlighted text
});

// Toggle showFullThought state
const toggleFullThought = () => {
    showFullThought.value = !showFullThought.value;
};
</script>

<template>
    <li class="mb-10 ms-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">{{ thought.emoji }}</span>
        <div class="flex justify-between mb-2">
            <h3 class="max-w-xs text-lg font-semibold text-gray-900 line-clamp-1">{{ truncatedThought }}</h3>
            <div class="relative">
                <svg 
                    @click="toggleDropdown"
                    class="w-6 h-6 text-gray-800 cursor-pointer" 
                    aria-hidden="true" 
                    aria-expanded="isDropdownOpen.toString()"
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                </svg>
                <div 
                    v-if="isDropdownOpen" 
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-300"
                >
                    <ul class="py-1 text-sm text-gray-700">
                        <li>
                            <a 
                                @click.prevent="showDeleteModal(thought.id)" 
                                class="block px-4 py-2 hover:bg-gray-100 text-red-500 font-semibold cursor-pointer"
                            >
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex justify-between text-gray-400">
            <time class="block mb-4 text-xs font-normal leading-none">Created on {{ thought.created_at }}</time>
            <div class="block mb-4 text-xs leading-none">Intensity Level <span class="font-semibold">{{ thought.intensityLevel }}</span></div>
        </div>
        <p 
            class="mb-4 text-sm font-normal text-gray-900 cursor-pointer"
            @click="toggleFullThought"
            v-html="highlightedThought" 
        ></p>
        <div class="flex justify-between">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ thought.category }}</span>
        </div>
    </li>
</template>
