<script setup>
import { reactive, defineProps, watch, onMounted } from 'vue';
import Thought from '@/components/Thought.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

const props = defineProps({
    initialThoughts: {
        type: Array,
        default: () => []
    },
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});

const state = reactive({
    thoughts: [],
    isLoading: true
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
</script>

<template>
    <section>
        <div class="bg-white rounded-xl p-6 rounded-lg shadow-sm">
            <ol id="thoughtsList" class="relative border-s border-gray-200">
                <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                    <PulseLoader />
                </div>

                <div v-else>
                    <Thought 
                        v-for="thought in state.thoughts" 
                        :key="thought.id" 
                        :thought="thought" 
                    />
                </div>
            </ol>
        </div>
    </section>

    <section v-if="props.showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/thoughts"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Thoughts</RouterLink>
    </section>
</template>
