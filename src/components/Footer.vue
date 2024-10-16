<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
 <footer class="text-xs text-gray-400 p-4 flex justify-center lg:pb-5 pb-20">
      <ul class="flex flex-wrap items-center justify-center">
        <li>
          <span>
            © 2024 <RouterLink to="/" class="hover:underline me-4">Mindful Tracker</RouterLink>
          </span>
        </li>
        <li>
          <RouterLink to="/" class="hover:underline me-4 md:me-6">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="hover:underline me-4 md:me-6">Privacy Policy</RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="hover:underline me-4 md:me-6">Cookies Policy</RouterLink>
        </li>
        <li>
          <RouterLink to="/" class="hover:underline me-4 md:me-6">Cookies Settings</RouterLink>
        </li>
      </ul>
    </footer>
</template>