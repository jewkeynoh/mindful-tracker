<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    isVisible: Boolean,
    onDelete: Function,
    onClose: Function
});

const confirmDelete = () => {
    props.onDelete();
    props.onClose();
};

const cancelDelete = () => {
    props.onClose();
};
</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-3xl w-80 shadow-3xl text-center">
            <div class="p-6">
                <h2 class="font-semibold mb-4">Delete Thought?</h2>
                <p class="text-gray-400">If you delete this post, you won't be able to restore it.</p>
            </div>
            <div class="flex justify-between">
                <a href="#" @click="cancelDelete" aria-current="page"
                    class="px-4 py-4 w-full text-sm font-medium bg-white border-t border-r border-gray-300 rounded-bl-3xl">
                    Cancel
                </a>
                <a href="#" @click="confirmDelete"
                    class="px-4 py-4 w-full text-sm font-bold bg-white border-t border-gray-300 rounded-br-3xl">
                    Delete
                </a>
            </div>
        </div>
    </div>
</template>