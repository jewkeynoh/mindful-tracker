<script setup>
import { defineProps, ref, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';
import Dropdown from './Dropdown.vue';

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
        await axios.put(`api/thoughts/${props.thought.id}`, updatedThought);
        emit('thoughtUpdated', updatedThought);

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
        <span class="absolute flex justify-center items-center w-8 h-8 bg-blue-100 rounded-full -start-4 ring-8 ring-white">{{ thought.emoji }}</span>
        <div class="flex justify-between items-start mb-3">
            <h3 class="flex-1 max-w-sm text-lg font-semibold text-gray-900 line-clamp-1 pr-4">{{ thought.thought }}</h3>
            <Dropdown customClass="lg:-ml-44 -ml-1">
                <template #buttonContent>
                    <svg 
                        class="w-6 h-6 text-gray-800" 
                        aria-hidden="true" 
                        aria-expanded="isDropdownOpen.toString()"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        fill="none" 
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                    </svg>
                </template>
                <ul class="py-1 text-sm divide-y divide-gray-200 font-semibold" aria-labelledby="dropdownDividerButton">
                    <li>
                        <a 
                            href="#" 
                            class="block px-4 py-2 hover:bg-gray-50 transition ease-in-out duration-150 active:scale-95 rounded" 
                            @click.prevent="toggleSaveThought" 
                        >
                            {{ thought.saved === 1 ? 'Unsave' : 'Save' }}
                        </a>
                    </li>
                    <li>
                        <a @click.prevent="showDeleteModal(thought.id)" class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-50 cursor-pointer transition ease-in-out duration-150 active:scale-95 rounded">Delete</a>
                    </li>
                </ul>
            </Dropdown>
        </div>
        <div class="flex justify-between font-medium text-sm text-gray-500 mb-3 -mt-3">
            <time class="text-gray-400 leading-none">{{ thought.created_at }}</time>
        </div>
        <p 
            class="mb-3 text-sm font-normal text-gray-700 cursor-pointer"
            @click="toggleFullThought"
            v-html="highlightedThought" 
        ></p>
        <div class="flex justify-between">
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">{{ thought.category }}</span>
        </div>
    </li>
</template>
