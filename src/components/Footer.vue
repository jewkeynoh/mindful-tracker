<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <footer class="lg:pb-6 pb-14 text-sm text-gray-400">
        <div class="w-full mx-auto max-w-screen-xl p-4 lg:flex lg:justify-between text-center">
            <div>© 2024 <RouterLink to="/" class="font-semibold hover:underline">Mindful
                    Tracker</RouterLink>.  Made with 💙
            </div> 
            <div class="text-center">
                <ul class="flex flex-wrap items-center justify-center font-medium lg:mt-0 mt-2">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>