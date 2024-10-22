<script setup>
import { ref, computed, onMounted } from 'vue';
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

// If the page reloads, check if the user is still authenticated from localStorage
onMounted(() => {
  if (!isUserAuthenticated.value) {
    // Automatically log out if there's no user in localStorage
    logout();
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <div class="w-full mx-auto flex-grow flex flex-col justify-center">
      <header>
        <Navigation v-if="isUserAuthenticated" @thoughtAdded="addThought" />
      </header>

      <main class="flex-grow flex items-center justify-center">
        <section v-if="isUserAuthenticated" class="flex items-center justify-center">
            <RouterView :thoughts="thoughts" />
        </section>

        <section v-else class="w-screen flex items-center justify-center px-4 lg:px-8">
          <Login/>
        </section>
      </main>
      <Footer v-if="!isUserAuthenticated" />
    </div>
  </div>
</template>
