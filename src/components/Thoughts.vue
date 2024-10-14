<script setup>
import { reactive, defineProps, watch, onMounted, onBeforeUnmount } from 'vue';
import Thought from '@/components/Thought.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import Card from './Card.vue';

const props = defineProps({
    initialThoughts: {
        type: Array,
        default: () => []
    },
    limit: Number
});

const state = reactive({
    thoughts: [],
    isLoading: true,
    openDropdownId: null // Track which dropdown is open
});

// Function to fetch thoughts from the API
const fetchThoughts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/thoughts'); // Update the URL if necessary
        // Sort the thoughts by created_at in descending order
        state.thoughts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
        console.error('Error fetching thoughts', error);
    } finally {
        state.isLoading = false;
    }
};

// Load existing thoughts from props if available
onMounted(() => {
    if (props.initialThoughts.length > 0) {
        // Add the existing thoughts to the state and sort them
        state.thoughts = [...props.initialThoughts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    fetchThoughts(); // Fetch thoughts from the API
});

// Function to toggle dropdown state
const toggleDropdown = (id) => {
    // If the clicked dropdown is already open, close it, else open the clicked one
    state.openDropdownId = state.openDropdownId === id ? null : id;
};

// Watch for new thoughts added
watch(
    () => props.initialThoughts,
    (newValue) => {
        const newThoughts = newValue.filter(newThought =>
            !state.thoughts.some(existingThought => existingThought.id === newThought.id)
        );

        if (newThoughts.length) {
            // Combine existing thoughts with the new thoughts and sort them
            state.thoughts = [...state.thoughts, ...newThoughts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    },
    { immediate: true, deep: true }
);

// Handle outside click to close dropdown
const handleClickOutside = (event) => {
    const dropdown = event.target.closest('.relative');
    if (!dropdown) {
        state.openDropdownId = null; // Close dropdown if clicking outside
    }
};

// Add event listener when the component is mounted
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Remove event listener when the component is unmounted
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <section>
        <Card mb="lg:mb-12 mb-8">
            <ol id="thoughtsList" class="relative border-s border-gray-200">
                <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                    <PulseLoader color="#1e40af" />
                </div>

                <div v-if="state.thoughts.length">
                    <Thought
                        v-for="thought in state.thoughts"
                        :key="thought.id"
                        :thought="thought"
                        :isDropdownOpen="state.openDropdownId === thought.id"
                        :toggleDropdown="() => toggleDropdown(thought.id)"
                    />
                </div>
                <div v-else class="text-gray-400 text-sm text-center">
                    No recent entries. Log your thoughts to keep track!
                </div>
            </ol>
        </Card>
    </section>
</template>
