<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import FormThought from '@/components/FormThought.vue';
import { defineEmits } from 'vue';
import Modal from '@/components/Modal.vue';
import Logo from './Logo.vue';
import useAuth from '@/useAuth';
import Dropdown from './Dropdown.vue';

const { isAuthenticated, logout } = useAuth();
const isUserAuthenticated = computed(() => isAuthenticated.value);

// Emit event to notify when a new thought is added
const emit = defineEmits(['thoughtAdded']);

// Check if the link is active
const isActiveLink = (routePath) => {
    const route = useRoute();
    return route.path === routePath;
};

const modals = ref({
  createThought: false
});

function openModal(createThought) {
  modals.value[createThought] = true;
}

// Function to handle thought addition
const handleThoughtAdded = (newThought) => {
    emit('thoughtAdded', newThought);
};

onMounted(() => {
    if (!isUserAuthenticated.value) {
        logout();
    }
});
</script>

<template>
    <!-- Mobile View -->
    <div 
        class="fixed top-0 left-0 w-full bg-white h-16 border-b border-gray-300 z-10 md:hidden flex justify-between p-5">
        <RouterLink to="/" class="flex items-center">
            <Logo />
            <span class="ms-2 font-bold">Mindful Tracker</span>
        </RouterLink>
        <div class="flex items-center">
            <Dropdown>
                <template #buttonContent>
                    <svg class="text-gray-300 w-7 h-7 hover:text-blue-800 transition-colors duration-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                    </svg>
                </template>
                <ul class="py-2 px-1 text-sm" aria-labelledby="dropdownDividerButton">
                    <li>
                        <a href="#" @click="logout"
                            class="block px-4 py-2 hover:bg-gray-100 transition ease-in-out duration-150 active:scale-95 rounded-lg">
                            Logout
                        </a>
                    </li>
                </ul>
            </Dropdown>
        </div>
    </div>

    <!-- Desktop View -->
    <div class="hidden md:flex fixed left-0 top-0 w-18 h-full flex flex-col pt-5 pb-5 px-2 justify-between items-center">
        <RouterLink to="/" class="flex items-center">
            <Logo />
        </RouterLink>

        <div class="flex flex-col items-center space-y-2">
            <RouterLink to="/" class="flex items-center justify-center transition ease-in-out duration-150 active:scale-90 h-16 w-16 group hover:bg-gray-100 hover:rounded-3xl">
                <svg :class="[isActiveLink('/') ? 'text-blue-800' : 'text-gray-300', 'w-7 h-7 hover:text-blue-800 transition-colors duration-500']"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                        clip-rule="evenodd" />
                </svg>
            </RouterLink>
            <RouterLink to="/analytics" class="flex items-center justify-center transition ease-in-out duration-150 active:scale-90 h-16 w-16 group hover:bg-gray-100 hover:rounded-3xl">
                <svg :class="[isActiveLink('/analytics') ? 'text-blue-800' : 'text-gray-300', 'w-7 h-7 hover:text-blue-800 transition-colors duration-500']"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                        d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                </svg>
            </RouterLink>

            <!-- Modal trigger -->
            <button @click="openModal('createThought')" class="flex items-center justify-center transition ease-in-out duration-150 active:scale-90 h-16 w-16 group bg-gray-100 rounded-3xl">
                <svg class="text-gray-400 w-7 h-7 hover:text-blue-800 transition-colors duration-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </button>
            
            <RouterLink to="/saved" class="flex items-center justify-center transition ease-in-out duration-150 active:scale-90 h-16 w-16 group hover:bg-gray-100 hover:rounded-3xl">
                <svg :class="[isActiveLink('/saved') ? 'text-blue-800' : 'text-gray-300', 'w-7 h-7 hover:text-blue-800 transition-colors duration-500']" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7.001 7.001 0 0 1 5 9Zm5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06Z" clip-rule="evenodd"/>
                </svg>
            </RouterLink>
            <RouterLink to="/profile" class="flex items-center justify-center transition ease-in-out duration-150 active:scale-90 h-16 w-16 group hover:bg-gray-100 hover:rounded-3xl">
                <svg :class="[isActiveLink('/profile') ? 'text-blue-800' : 'text-gray-300', 'w-7 h-7 hover:text-blue-800 transition-colors duration-500']"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                        clip-rule="evenodd" />
                </svg>
            </RouterLink>
        </div>

        <div class="flex flex-col items-center">
            <Dropdown>
                <template #buttonContent>
                    <svg class="text-gray-300 w-7 h-7 hover:text-blue-800 transition-colors duration-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                    </svg>
                </template>
                <ul class="py-2 px-1 text-sm" aria-labelledby="dropdownDividerButton">
                    <li>
                        <a href="#" @click="logout"
                            class="block px-4 py-2 hover:bg-gray-100 transition ease-in-out duration-150 active:scale-95 rounded-lg">
                            Logout
                        </a>
                    </li>
                </ul>
            </Dropdown>
        </div>
        
    </div>

    <!-- Mobile View -->
    <div class="fixed bottom-0 z-10 left-0 w-full bg-white h-16 md:hidden">
        <div class="flex h-full justify-around items-center">
            <RouterLink to="/" class="flex flex-col items-center justify-center">
                <svg :class="[isActiveLink('/') ? 'text-blue-800' : 'text-gray-300', 'w-6 h-6']" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                        clip-rule="evenodd" />
                </svg>
            </RouterLink>
            <RouterLink to="/analytics" class="flex flex-col items-center justify-center">
                <svg :class="[isActiveLink('/analytics') ? 'text-blue-800' : 'text-gray-300', 'w-6 h-6']"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                        d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                </svg>
            </RouterLink>
            <button @click="openModal('createThought')" class="flex flex-col items-center justify-center">
                <svg class="text-gray-300 w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                        d="M5 12h14m-7 7V5" />
                </svg>
            </button>
            <RouterLink to="/saved" class="flex flex-col items-center justify-center">
                <svg :class="[isActiveLink('/saved') ? 'text-blue-800' : 'text-gray-300', 'w-6 h-6']" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7.001 7.001 0 0 1 5 9Zm5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06Z" clip-rule="evenodd"/>
                </svg>
            </RouterLink>
            <RouterLink to="/profile" class="flex flex-col items-center justify-center">
                <svg :class="[isActiveLink('/profile') ? 'text-blue-800' : 'text-gray-300', 'w-6 h-6']"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                        clip-rule="evenodd" />
                </svg>
            </RouterLink>
        </div>
    </div>

    <!-- Modal -->
    <Modal v-model="modals.createThought" title="Add a Thought" @update:isOpen="isModalOpen = $event">
        <FormThought @thoughtAdded="handleThoughtAdded" />
    </Modal>
</template>
