<script setup>
import { ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import Login from './components/Login.vue';
import useAuth from '@/useAuth';

const { isAuthenticated, logout } = useAuth();

// Use computed to track the authentication state reactively
const isUserAuthenticated = computed(() => isAuthenticated.value);

// Global thoughts state
const thoughts = ref([]);

// Method to handle adding a new thought
const addThought = (newThought) => {
    thoughts.value.push(newThought);
    thoughts.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full mx-auto max-w-2xl flex-grow flex flex-col justify-center">
      <Login v-if="!isUserAuthenticated" />

      <div v-else>
        <button @click="logout" class="mb-4">Logout</button>
        <RouterView :thoughts="thoughts" />
        <Navigation @thoughtAdded="addThought" />
      </div>
    </div>
  
    <Footer />
  </div>
</template>
