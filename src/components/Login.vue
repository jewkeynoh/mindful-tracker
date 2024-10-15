<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import useAuth from '@/useAuth';
  import { useRouter } from 'vue-router';
  
  const router = useRouter(); // Get the router instance
  const { login } = useAuth();
  
  const username = ref('');
  const password = ref('');
  
  const handleLogin = async () => {
      const success = await login(username.value, password.value);
      if (success) {
          router.push('/'); // Redirect to the home page or any other authenticated route
      }
  };
  </script>
  