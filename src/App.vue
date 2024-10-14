<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import Footer from '@/components/Footer.vue';

// Global thoughts state
const thoughts = ref([]);

// Method to handle adding a new thought
const addThought = (newThought) => {
    thoughts.value.push(newThought);
    thoughts.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full mx-auto max-w-2xl">
      <RouterView :thoughts="thoughts" />
      <Navigation @thoughtAdded="addThought" />
    </div>
  </div>
  
  <Footer />
</template>
