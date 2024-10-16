<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <section class="flex items-center justify-center px-4 lg:px-8">
        <div class="lg:w-screen flex flex-col justify-center lg:px-6 mx-auto w-full lg:max-w-xl">
            <div class="text-center">
                <h1 class="font-bold mb-2">Sorry, this page isn't available</h1>
                <p class="text-sm text-gray-400 mb-2 w-1/2 text-center">The link you followed may be broken, or the page may have been removed.</p>
                <RouterLink to="/" class="px-3 py-2 text-sm text-white bg-blue-800 hover:bg-blue-900 rounded-3xl mt-2">Go Back</RouterLink>
            </div>
        </div>
    </section>
</template>