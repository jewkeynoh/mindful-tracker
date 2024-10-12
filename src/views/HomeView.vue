<script setup>
import Footer from '@/components/Footer.vue';
import Form from '@/components/Form.vue';
import Thoughts from '@/components/Thoughts.vue';
import { ref } from 'vue';

const thoughts = ref([]);

// Function to handle thought addition
const handleThoughtAdded = (newThought) => {
    // Add the new thought to the thoughts array
    thoughts.value.push(newThought);

    // Sort thoughts by created_at in descending order
    thoughts.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};
</script>

<template>
  <div class="min-h-screen p-8 flex items-center justify-center">
    <div class="w-full mx-auto max-w-3xl">
      <Form @thoughtAdded="handleThoughtAdded" />
      <Thoughts :initialThoughts="thoughts" />
    </div>
  </div>
  <Footer />
</template>
