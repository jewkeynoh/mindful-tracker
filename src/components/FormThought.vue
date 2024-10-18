<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

// Define emit
const emit = defineEmits(['thoughtAdded']);
const toast = useToast(); // Initialize the toast

const form = reactive({
    thought: '',
    category: '',
    intensityLevel: '',
});

// Error state
const errors = reactive({
    thought: '',
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

const textareaRef = ref(null);

// Computed property to check if the button should be disabled
const isButtonDisabled = computed(() => {
    return !(form.thought && form.category && form.intensityLevel);
});

const handleEmojiClick = (value) => {
    form.intensityLevel = value;
    errors.intensityLevel = ''; // Clear the error message when an emoji is clicked
};

// Form validation function
const validateForm = () => {
    // Clear previous errors
    errors.thought = '';
    errors.category = '';
    errors.intensityLevel = '';

    let isValid = true;

    // Validate thought
    if (!form.thought) {
        errors.thought = 'Thought description is required.';
        isValid = false;
    }

    // Validate category
    if (!form.category) {
        errors.category = 'Category is required.';
        isValid = false;
    }

    // Validate intensity level
    if (!form.intensityLevel) {
        errors.intensityLevel = 'Intensity level is required.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    // Validate the form
    if (!validateForm()) {
        return; // Stop submission if validation fails
    }

    const newThought = {
        thought: form.thought,
        category: form.category,
        intensityLevel: form.intensityLevel,
        emoji: emojis[form.intensityLevel],
        saved: 0,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    try {
        const response = await axios.post('/api/thoughts', newThought);

        // Emit event after a successful addition
        emit('thoughtAdded', response.data);

        // Reset form fields
        form.thought = '';
        form.category = '';
        form.intensityLevel = '';

        // Show success toast notification
        toast.success('Thought logged successfully!');

    } catch (error) {
        console.error('Error creating thought', error);
        // Show error toast notification
        toast.error('Error creating thought: ' + (error.response?.data?.message || 'Unknown error'));
    }
};

function autoResize(textarea) {
    // Hide the overflow and reset the height to auto for proper resizing
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    // Set height to match the scroll height of the content
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Resize the textarea when the component is mounted
onMounted(() => {
    if (textareaRef.value) {
        autoResize(textareaRef.value);
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" aria-label="Log Your Thoughts">
        <div class="p-5 text-gray-900">
            <div class="mb-5">
                <label class="block text-sm font-semibold mb-2" for="thought">Describe Your Thought</label>
                <textarea v-model="form.thought" id="thought" name="thought" :class="[ 
                    'resize-none w-full p-2.5 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-300', 
                    errors.thought ? 'border border-red-600 focus:border-red-600' : 'border border-gray-300' 
                ]" rows="5" placeholder="What's on your mind?"
                    @input="autoResize($event.target); errors.thought = ''">
                </textarea>
                <p v-if="errors.thought" class="text-red-600 text-sm mt-1">{{ errors.thought }}</p>
            </div>

            <div class="mb-5">
                <label class="block text-sm font-semibold mb-2" for="category">Select a Category</label>
                <select v-model="form.category" id="category" name="category" :class="[ 
                    'w-full p-2.5 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-300', 
                    errors.category ? 'border border-red-600 focus:border-red-600' : 'border border-gray-200' 
                ]" aria-required="true" @change="errors.category = ''">
                    <option value="" disabled>Select a category</option>
                    <option value="Work">Work</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                </select>
                <p v-if="errors.category" class="text-red-600 text-sm mt-1">{{ errors.category }}</p>
            </div>
            <div class="mb-5">
                <label class="block text-sm font-semibold mb-2">Rate the Intensity</label>
                <div class="emoji-rating flex flex-wrap justify-center lg:justify-between gap-2"
                    aria-labelledby="intensity-label">
                    <span v-for="value in 10" :key="value" :data-value="value" @click="handleEmojiClick(value)"
                        :class="{ 'active': form.intensityLevel == value }"
                        class="cursor-pointer text-3xl transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-125">
                        {{ emojis[value] }}
                    </span>
                </div>
                <input type="hidden" required v-model="form.intensityLevel" />
                <p v-if="errors.intensityLevel" class="text-red-600 text-sm mt-1">{{ errors.intensityLevel }}</p>
            </div>
        </div>
        <div class="flex items-center justify-end px-5 mb-2">
            <button type="submit" 
                :disabled="isButtonDisabled"
                :class="[ 
                    isButtonDisabled ? 'text-gray-300 bg-blue-200 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900 transition ease-in-out duration-150 active:scale-95'
                ]"
                class="w-full text-white font-bold focus:outline-none rounded-xl text-sm px-5 py-4 text-center">
                Log Thought
            </button>
        </div>
    </form>
</template>

<style scoped>
.emoji-rating span.active {
    transform: scale(1.3);
}
</style>
