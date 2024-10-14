<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
    thought: Object,
    isDropdownOpen: Boolean,
    toggleDropdown: Function,
    showDeleteModal: Function // Prop for showing delete modal
});

const showFullThought = ref(false);

// Compute truncated thought text
const truncatedThought = computed(() => {
    let thought = props.thought.thought;
    if (!showFullThought.value) {
        thought = thought.length > 90 ? thought.substring(0, 90) + '...' : thought;
    }
    return thought;
});
</script>

<template>
    <li class="mb-10 ms-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">{{ thought.emoji }}</span>
        <div class="flex justify-between mb-2">
            <h3 class="max-w-xs text-lg font-semibold text-gray-900 line-clamp-1">{{ truncatedThought }}</h3>
            <div class="relative">
                <!-- Dropdown button -->
                <svg 
                    @click="toggleDropdown"
                    class="w-6 h-6 text-gray-800 cursor-pointer" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                </svg>
                <!-- Dropdown menu -->
                <div 
                    v-if="isDropdownOpen" 
                    class="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10 border border-gray-300"
                >
                    <ul class="py-1 text-sm text-gray-700">
                        <li>
                            <a @click.prevent="showDeleteModal(thought.id)" class="block px-4 py-2 hover:bg-gray-100 text-red-500 font-semibold cursor-pointer">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex justify-between text-gray-400">
            <time class="block mb-4 text-xs font-normal leading-none">Created on {{ thought.created_at }}</time>
            <div class="block mb-4 text-xs leading-none">Intensity Level <span class="font-semibold">{{ thought.intensityLevel }}</span></div>
        </div>
        <p class="mb-4 text-sm font-normal text-gray-900">
            {{ thought.thought }}
        </p>
        <div class="flex justify-between">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ thought.category }}</span>
        </div>
    </li>
</template>