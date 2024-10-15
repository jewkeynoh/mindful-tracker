<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast(); // Initialize the toast

// Define emit for communication with parent components (if needed)
const emit = defineEmits(['profileUpdated']);

const form = reactive({
    name: '',
    email: '',
    bio: ''
});

// Error state
const errors = reactive({
    name: '',
    email: '',
    bio: ''
});

// Computed property to check if the button should be disabled
const isButtonDisabled = computed(() => {
    return !(form.name && form.email);
});

// Function to fetch user profile data
const fetchUserProfile = async () => {
    try {
        // Assuming the user's ID is 1 for this example (adjust if needed)
        const userId = 1;
        const response = await axios.get(`/api/users/${userId}`);
        const userData = response.data;

        // Populate the form with the fetched user data
        form.name = userData.name;
        form.email = userData.email;
        form.bio = userData.bio || ''; // Set default bio if not present
    } catch (error) {
        console.error('Error fetching user profile', error);
        toast.error('Error fetching user profile: ' + (error.response?.data?.message || 'Unknown error'));
    }
};

// Form validation function
const validateForm = () => {
    // Clear previous errors
    errors.name = '';
    errors.email = '';
    errors.bio = '';

    let isValid = true;

    // Validate name
    if (!form.name) {
        errors.name = 'Name is required.';
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
        errors.email = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(form.email)) {
        errors.email = 'Please enter a valid email address.';
        isValid = false;
    }

    return isValid;
};

// Function to handle form submission
const handleSubmit = async () => {
    if (!validateForm()) {
        return; // Stop submission if validation fails
    }

    // Construct the updated profile object
    const updatedProfile = {
        name: form.name,
        email: form.email,
        bio: form.bio,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    try {
        // Assuming the user's ID is 1 for this example (you might need to adjust this)
        const userId = 1;
        await axios.put(`/api/users/${userId}`, updatedProfile);

        // Emit event after a successful update
        emit('profileUpdated', updatedProfile);

        // Show success toast notification
        toast.success('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile', error);
        // Show error toast notification
        toast.error('Error updating profile: ' + (error.response?.data?.message || 'Unknown error'));
    }
};

// Function to auto-resize the textarea (if needed)
function autoResize(textarea) {
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Resize the textarea when the component is mounted
const textareaRef = ref(null);
onMounted(() => {
    fetchUserProfile(); // Fetch the user profile data when the component mounts

    if (textareaRef.value) {
        autoResize(textareaRef.value);
    }
});
</script>

<template>
    <form @submit.prevent="handleSubmit" aria-label="Update Your Profile">
        <div class="p-5 pb-0 text-gray-900">
            <div class="mb-5">
                <label class="block text-sm font-semibold mb-2" for="name">Full Name</label>
                <input
                    v-model="form.name"
                    id="name"
                    type="text"
                    :class="[ 
                        'w-full p-2.5 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-300',
                        errors.name ? 'border border-red-600 focus:border-red-600' : 'border border-gray-300'
                    ]"
                    placeholder="Enter your name"
                    @input="errors.name = ''"
                />
                <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div class="mb-5">
                <label class="block text-sm font-semibold mb-2" for="email">Email Address</label>
                <input
                    v-model="form.email"
                    id="email"
                    type="email"
                    :class="[ 
                        'w-full p-2.5 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-300',
                        errors.email ? 'border border-red-600 focus:border-red-600' : 'border border-gray-300'
                    ]"
                    placeholder="Enter your email"
                    @input="errors.email = ''"
                />
                <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>

            <div>
                <label class="block text-sm font-semibold mb-2" for="bio">Bio</label>
                <textarea v-model="form.bio" id="bio" :class="[ 
                    'resize-none w-full p-2.5 rounded-xl focus:outline-none focus:ring-0 focus:border-gray-300',
                    errors.bio ? 'border border-red-600 focus:border-red-600' : 'border border-gray-300' 
                ]" rows="2" placeholder="Write a bio..."
                    @input="autoResize($event.target); errors.bio = ''">
                </textarea>
                <p v-if="errors.bio" class="text-red-600 text-sm mt-1">{{ errors.bio }}</p>
            </div>
        </div>

        <div class="flex items-center justify-end p-5 mb-2">
            <button
                type="submit"
                :disabled="isButtonDisabled"
                :class="[ 
                    isButtonDisabled ? 'text-gray-300 bg-blue-200 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900 transition ease-in-out duration-150 active:scale-95'
                ]"
                class="w-full text-white font-bold focus:outline-none rounded-xl text-sm px-5 py-4 text-center"
            >
                Update Profile
            </button>
        </div>
    </form>
</template>