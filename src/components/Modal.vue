<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    title: String,
});

const emit = defineEmits(['update:modelValue']);

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
});

function closeModal() {
    emit('update:modelValue', false);
}

function closeOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

// Close modal on 'Escape' key press
function handleEscape(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape);
});
</script>

<template>
    <div v-if="isVisible" @click="closeOnOverlay" class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-full lg:max-w-2xl lg:h-auto h-screen max-h-full overflow-y-auto" @click.stop>
            <div class="relative bg-white lg:rounded-3xl h-full shadow-md pb-5">
                <div class="flex items-center justify-between p-5 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
                    <span @click="closeModal" class="cursor-pointer transition ease-in-out duration-150 active:scale-95">
                        Cancel
                    </span>
                </div>
                <div class="overflow-y-auto max-h-[calc(100vh-4rem)]">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>