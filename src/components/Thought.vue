<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
    thought: Object
});

const showFullThought = ref(false);

const truncatedThought = computed(() => {
    let thought = props.thought.thought;
    if(!showFullThought.value){
        thought = thought.substring(0, 90) + '...';
    }

    return thought;
})
</script>

<template>
    <li class="mb-10 ms-6">
        <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">{{ thought.emoji }}</span>
        <div class="flex justify-between mb-2">
            <h3 class="max-w-xs text-lg font-semibold text-gray-900 line-clamp-1">{{ truncatedThought}}</h3>
        </div>
        <div class="flex justify-between">
            <time class="block mb-4 text-xs font-normal leading-none text-gray-400">Created on {{ thought.created_at }}</time>
            <div class="block mb-4 text-xs font-normal leading-none text-gray-400">Intensity Level <span class="font-semibold">{{ thought.intensity }}</span></div>
        </div>
        <p class="mb-4 text-sm font-normal">
            {{ thought.thought }}
        </p>
        <div class="flex justify-between">
            <div class="relative flex items-center space-x-4 text-gray-500">
                <a href="#" class="editBtn text-xs hover:font-semibold">Edit</a>
                <span class="inline-block h-3 border-l-2 border-gray-200"></span>
                <a href="#" class="deleteBtn text-xs hover:font-semibold">Delete</a>
            </div>
            <div>
                <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ thought.category }}</span>
            </div>
        </div>
    </li>
</template>