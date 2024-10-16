<script setup>
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
    thought: Object,
    isDropdownOpen: Boolean,
    toggleDropdown: Function,
    showDeleteModal: Function,
    searchTerm: String,
});

const emit = defineEmits(['thoughtUpdated']);

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
    if (!props.searchTerm) return truncatedThought.value;

    const escapedSearchTerm = props.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    return thoughtText.replace(regex, '<span style="background:yellow;">$1</span>');
});

// Toggle showFullThought state
const toggleFullThought = () => {
    showFullThought.value = !showFullThought.value;
};

// Method to toggle the saved state
const toggleSaveThought = async () => {
    const newSavedState = props.thought.saved === 1 ? 0 : 1;
    const updatedThought = { ...props.thought, saved: newSavedState };

    try {
        await axios.put(`api/thoughts/${props.thought.id}`, updatedThought); // Adjust the URL as needed
        emit('thoughtUpdated', updatedThought); // Emit the updated thought

        if (newSavedState === 1) {
            toast.success('Thought saved successfully!');
        } else {
            toast.success('Thought unsaved successfully!');
        }
    } catch (error) {
        console.error('Error updating thought:', error);
        toast.error('Error saving thought: ' + (error.response?.data?.message || 'Unknown error'));
    }
};
</script>

<template>
    <li class="mb-10 ms-6">
        <span class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">{{ thought.emoji }}</span>
        <div class="flex justify-between mb-2">
            <h3 class="max-w-xs text-lg font-semibold text-gray-900 line-clamp-1 max-h-6">{{ thought.thought }}</h3>
            <div class="relative">
                <svg 
                    @click="toggleDropdown"
                    class="w-10 h-10 text-gray-800 cursor-pointer transition ease-in-out duration-150 active:scale-90 hover:bg-gray-100 rounded-full p-2" 
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

                <div v-if="isDropdownOpen" class="z-10 absolute font-semibold right-0 bg-white divide-y divide-gray-200 rounded-xl shadow w-44 border border-gray-300">
                    <ul class="py-2 px-1 text-sm" aria-labelledby="dropdownDividerButton">
                        <li>
                            <a 
                                href="#" 
                                class="block px-4 py-2 hover:bg-gray-100 transition ease-in-out duration-150 active:scale-95 rounded-lg" 
                                @click.prevent="toggleSaveThought" 
                            >
                                {{ thought.saved === 1 ? 'Unsave' : 'Save' }}
                            </a>
                        </li>
                    </ul>
                    <div class="py-2 px-1">
                        <a @click.prevent="showDeleteModal(thought.id)" class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer transition ease-in-out duration-150 active:scale-95 rounded-lg">Delete</a>
                    </div>
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
