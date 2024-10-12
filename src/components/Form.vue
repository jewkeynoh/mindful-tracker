<script setup>
import { reactive, ref, computed } from 'vue';
import axios from 'axios';
import Card from '@/components/Card.vue';
import Alert from '@/components/Alert.vue';

// Define emit
const emit = defineEmits(['thoughtAdded']);

const form = reactive({
    thought: '',
    category: '',
    intensityLevel: '',
});

// Alert state
const showAlert = ref(false);
const alertType = ref({
    bg: '',
    color: '',
    message: '',
    status: '',
});

// Error state
const errors = reactive({
    thought: '', // Make sure this is properly initialized
    category: '',
    intensityLevel: '',
});

const emojis = {
    1: '😊',
    2: '🙂',
    3: '😐',
    4: '😕',
    5: '🙁',
    6: '☹️',
    7: '😣',
    8: '😖',
    9: '😫',
    10: '😭'
};

const handleEmojiClick = (value) => {
    form.intensityLevel = value;
};

const validateForm = () => {
    // Reset errors
    errors.thought = '';
    errors.category = '';
    errors.intensityLevel = '';

    let isValid = true;

    // Validate each field
    if (!form.thought) {
        errors.thought = 'Thought description is required.';
        isValid = false;
    }
    if (!form.category) {
        errors.category = 'Category is required.';
        isValid = false;
    }
    if (!form.intensityLevel) {
        errors.intensityLevel = 'Intensity level is required.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    // Validate the form
    if (!validateForm()) {
        return; // Stop if validation fails
    }

    const newThought = {
        thought: form.thought,
        category: form.category,
        intensityLevel: form.intensityLevel,
        emoji: emojis[form.intensityLevel],
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
        const response = await axios.post('/api/thoughts', newThought);

        // Emit event after a successful addition
        emit('thoughtAdded', response.data);

        // Show success alert
        alertType.value = {
            bg: 'bg-green-50',
            color: 'text-green-800',
            message: 'Thought logged successfully!',
            status: 'Success',
        };
        showAlert.value = true;

        // Reset form fields
        form.thought = '';
        form.category = '';
        form.intensityLevel = '';

    } catch (error) {
        console.error('Error creating thought', error);

        // Show error alert
        alertType.value = {
            bg: 'bg-red-50',
            color: 'text-red-800',
            message: 'Failed to log thought. Please try again.',
            status: 'Error',
        };
        showAlert.value = true;
    }
};

// Computed property to determine if the button should be disabled
const isButtonDisabled = computed(() => {
    return !form.thought || !form.category || !form.intensityLevel;
});
</script>

<template>
    <Card>
        <h1 class="text-4xl font-bold mb-2 text-center text-blue-800">Mindful Tracker</h1>
        <p class="text-center mb-6 text-gray-700">Log and manage your thoughts to track overthinking patterns with
            clarity.</p>

        <Alert v-if="showAlert" :bg="alertType.bg" :color="alertType.color" :message="alertType.message"
            :status="alertType.status" />

        <form @submit.prevent="handleSubmit" class="bg-blue-50 p-6 rounded-lg" aria-label="Log Your Thoughts">
            <div class="mb-5">
                <label class="block text-sm font-medium mb-2" for="thought">Thought Description</label>
                <textarea v-model="form.thought" id="thought" name="thought"
                    :class="[
                        'resize-none w-full p-3 rounded-lg focus:outline-none focus:ring-1',
                        errors.thought ? 'border border-red-600 focus:ring-red-600' : 'border border-blue-200 focus:ring-blue-800'
                    ]"
                    rows="3" placeholder="Describe what's on your mind..."></textarea>
                    <p v-if="errors.thought" class="text-red-600 text-xs mt-1">{{ errors.thought }}</p>
            </div>
            <div class="mb-5">
                <label class="block text-sm font-medium mb-2" for="category">Category</label>
                <select v-model="form.category" id="category" name="category"
                    class="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-800"
                    aria-required="true">
                    <option value="" disabled>Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                </select>
                <p v-if="errors.category" class="text-red-600 text-xs mt-1">{{ errors.category }}</p>
            </div>
            <div class="mb-5">
                <label class="block text-sm font-medium mb-2">Intensity Level</label>
                <div class="emoji-rating flex justify-between" aria-labelledby="intensity-label">
                    <span 
                        v-for="value in 10" 
                        :key="value" 
                        :data-value="value" 
                        @click="handleEmojiClick(value)" 
                        :class="{'active': form.intensityLevel == value}"
                        class="cursor-pointer"
                    >
                        {{ emojis[value] }}
                    </span>
                </div>
                <input type="hidden" required v-model="form.intensityLevel" />
                <p v-if="errors.intensityLevel" class="text-red-600 text-xs mt-1">{{ errors.intensityLevel }}</p>
            </div>
            <button type="submit"
                class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-colors duration-200 bg-blue-800 hover:bg-blue-900"
                aria-label="Log Thought Entry">Log Thought</button>
        </form>
    </Card>
</template>

<style scoped>
.emoji-rating span {
    cursor: pointer;
    font-size: 1.7rem; /* Increased size for better touch target */
    transition: transform 0.2s, filter 0.2s; /* Added filter transition for a more dynamic effect */
}

.emoji-rating span:hover,
.emoji-rating span.active { /* Modify to include the active state */
    transform: scale(1.5); /* Slightly increase size on hover */
}
</style>