<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        default: 'Modal Title',
    },
});

const emit = defineEmits(['update:isOpen']);

const closeModal = () => {
    emit('update:isOpen', false);
};
</script>

<template>
    <!-- Main modal -->
    <div v-if="isOpen" tabindex="-1" aria-hidden="true" class="fixed inset-0 flex items-center justify-center z-60 bg-black bg-opacity-50">
    <div class="relative lg:p-5 w-full lg:h-auto h-screen max-h-full lg:max-w-2xl lg:max-h-full">
        <div class="relative bg-white lg:rounded-3xl h-full lg:px-2">
            <div class="flex items-center justify-between p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900">
                    {{ title }}
                </h3>
                <span @click="closeModal" class="cursor-pointer transition ease-in-out duration-150 active:scale-95">Cancel</span>
            </div>
            <div class="overflow-y-auto h-full">
                <slot></slot>
            </div>
        </div>
    </div>
</div>

</template>
