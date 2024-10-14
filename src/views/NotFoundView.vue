<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
        <i class="pi pi-exclamation-triangle text-yellow-500 text-7xl mb-5"></i>
        <h1 class="font-bold mb-2">Sorry, this page isn't available</h1>
        <p class="text-sm text-gray-400 mb-2 w-1/2">The link you followed may be broken, or the page may have been removed.</p>
        <RouterLink to="/" class="px-3 py-2 text-sm text-white bg-blue-800 hover:bg-blue-900 rounded-3xl mt-2">Go Back</RouterLink>
    </section>
</template>