<script setup>
import { reactive, defineProps, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import Thought from '@/components/Thought.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import Card from './Card.vue';
import { useToast } from 'vue-toastification';
import DeleteModal from '@/components/DeleteModal.vue';

const toast = useToast();

const props = defineProps({
    initialThoughts: {
        type: Array,
        default: () => []
    },
    limit: Number,
    searchTerm: {
        type: String,
        default: ''
    }
});

const state = reactive({
    thoughts: [],
    isLoading: true,
    openDropdownId: null,
    isDeleteModalVisible: false,
    currentThoughtId: null
});

// Function to fetch thoughts from the API
const fetchThoughts = async () => {
    try {
        const response = await axios.get('api/thoughts'); // Update the URL if necessary
        state.thoughts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
        console.error('Error fetching thoughts', error);
    } finally {
        state.isLoading = false;
    }
};

// Pag-filter ng thoughts batay sa searchTerm
const filteredThoughts = computed(() => {
    if (!props.searchTerm) return state.thoughts; // If no search term, return all thoughts
    return state.thoughts.filter(thought => 
        thought.thought.toLowerCase().includes(props.searchTerm.toLowerCase())
    );
});

// Load existing thoughts from props if available
onMounted(() => {
    if (props.initialThoughts.length > 0) {
        state.thoughts = [...props.initialThoughts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    fetchThoughts();
});

// Function to toggle dropdown state
const toggleDropdown = (id) => {
    state.openDropdownId = state.openDropdownId === id ? null : id;
};

// Function to show the delete modal
const showDeleteModal = (thoughtId) => {
    state.isDeleteModalVisible = true;
    state.currentThoughtId = thoughtId;
};

// Function to confirm delete action
const confirmDelete = () => {
    deleteThought(state.currentThoughtId);
    state.currentThoughtId = null;
};

// Function to delete a thought
const deleteThought = async (thoughtId) => {
    try {
        await axios.delete(`api/thoughts/${thoughtId}`);
        state.thoughts = state.thoughts.filter(thought => thought.id !== thoughtId);
        toast.success('Thought deleted successfully!');
    } catch (error) {
        console.error('Error deleting thought', error);
        toast.error('Error deleting thought: ' + (error.response?.data?.message || 'Unknown error'));
    }
};

// Watch for new thoughts added
watch(
    () => props.initialThoughts,
    (newValue) => {
        const newThoughts = newValue.filter(newThought =>
            !state.thoughts.some(existingThought => existingThought.id === newThought.id)
        );

        if (newThoughts.length) {
            state.thoughts = [...state.thoughts, ...newThoughts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }
    },
    { immediate: true, deep: true }
);

// Handle outside click to close dropdown
const handleClickOutside = (event) => {
    const dropdown = event.target.closest('.relative');
    if (!dropdown) {
        state.openDropdownId = null;
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
        <Card mb="lg:mb-12 mb-8" border="lg:border lg:border-gray-300">
            <ol id="thoughtsList" class="relative border-s border-gray-200">
                <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                    <PulseLoader color="#1e40af" />
                </div>

                <div v-if="filteredThoughts.length">
                    <Thought
                        v-for="thought in filteredThoughts"
                        :key="thought.id"
                        :thought="thought"
                        :isDropdownOpen="state.openDropdownId === thought.id"
                        :toggleDropdown="() => toggleDropdown(thought.id)"
                        :showDeleteModal="showDeleteModal"
                    />
                </div>
                <div v-else class="text-gray-400 text-sm text-center">
                    No recent entries. Log your thoughts to keep track!
                </div>
            </ol>
        </Card>

        <!-- Delete Modal -->
        <DeleteModal 
            :isVisible="state.isDeleteModalVisible" 
            :onDelete="confirmDelete" 
            :onClose="() => { state.isDeleteModalVisible = false; }" 
        />
    </section>
</template>
