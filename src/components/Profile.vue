<script setup>
import { ref, onMounted } from 'vue';
import FormProfile from './FormProfile.vue';
import Modal from './Modal.vue';
import axios from 'axios';

const profile = ref({});

const modals = ref({
  updateProfile: false
});

function openModal(modalName) {
  modals.value[modalName] = true;
}

const fetchUserProfile = async () => {
    try {
        const userId = 1;
        const response = await axios.get(`/api/users/${userId}`);
        profile.value = response.data;
    } catch (error) {
        console.error('Error fetching user profile', error);
        toast.error('Error fetching user profile: ' + (error.response?.data?.message || 'Unknown error'));
    }
};

const handleProfileUpdated = () => {
    fetchUserProfile(); // Fetch updated profile data
};

onMounted(() => {
    fetchUserProfile();
});
</script>

<template>
    <!-- User Information Section -->
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-2xl font-semibold">{{ profile.name }}</h2>
            <p class="text-gray-400 text-sm">{{ profile.email }}</p>
            <p class="mt-4 text-sm">{{ profile.bio }}</p>
        </div>
        <img src="https://placehold.co/100" alt="Profile Picture"
            class="w-24 h-24 rounded-full border-2 border-gray-300">
    </div>

    <!-- User Statistics Section -->
    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-indigo-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-indigo-500">
            <p class="text-indigo-700 font-semibold">Total Thoughts Logged</p>
            <p class="text-3xl font-bold">120</p>
        </div>
        <div class="bg-green-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-green-500">
            <p class="text-green-700 font-semibold">Streaks</p>
            <p class="text-3xl font-bold">7 Days</p>
        </div>
        <div class="bg-blue-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-blue-500">
            <p class="text-blue-700 font-semibold">Most Frequent Feeling</p>
            <p class="text-3xl font-bold">Calm</p>
        </div>
    </div>

    <!-- Personalization/Settings Section -->
    <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Settings</h3>
        <div class="grid grid-cols-1 gap-5">
            <div class="flex flex-wrap justify-between">
                <span>Personal Information</span>
                <div class="flex flex-wrap items-center">
                    <button  @click="openModal('updateProfile')"
                        class="cursor-pointer transition ease-in-out duration-150 active:scale-95">
                        <svg class="w-6 h-6 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m9 5 7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap justify-between">
                <span>Daily Reminder Notifications</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-800">
                    </div>
                </label>
            </div>
            <div class="flex flex-wrap justify-between">
                <span>Private</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer">
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-800">
                    </div>
                </label>
            </div>
            <div class="flex flex-wrap justify-between">
                <span>Dark Mode</span>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer">
                    <div
                        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-800">
                    </div>
                </label>
            </div>
        </div>
    </div>

    <!-- Achievements Section -->
    <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Achievements</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
                class="bg-yellow-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-yellow-500 flex items-center">
                <span class="text-yellow-700 font-semibold">🎉 10 Thoughts Logged</span>
            </div>
            <div
                class="bg-yellow-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-yellow-500 flex items-center">
                <span class="text-yellow-700 font-semibold">🔥 7-Day Streak</span>
            </div>
            <div
                class="bg-yellow-100 p-4 rounded-lg text-sm outline-dashed outline-1 outline-yellow-500 flex items-center">
                <span class="text-yellow-700 font-semibold">🌅 Morning Routine Master</span>
            </div>
        </div>
    </div>

    <!-- Subscription Information Section -->
    <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Subscription</h3>
        <p class="text-gray-600">You are currently on the <strong>Free Plan</strong>. <a href="#"
                class="text-blue-500 hover:underline">Upgrade</a> to enjoy more features.</p>
    </div>

    <!-- Logout Button -->
    <div class="mt-8">
        <button
            class="bg-red-500 hover:bg-red-600 transition ease-in-out duration-150 active:scale-95 w-full text-white font-bold focus:outline-none rounded-xl text-sm px-5 py-4 text-center cursor-pointer">Logout</button>
    </div>

    <Modal v-model="modals.updateProfile" title="Add a Thought" @update:isOpen="isModalOpen = $event">
        <FormProfile @profileUpdated="handleProfileUpdated"/>
    </Modal>
</template>