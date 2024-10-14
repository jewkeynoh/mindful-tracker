<script setup>
import { defineProps } from 'vue';

const props = defineProps(['message', 'type', 'close']);
</script>

<template>
    <div class="custom-toast" :class="type">
        <span>{{ message }}</span>
        <button @click="close">×</button>
    </div>
</template>

<style scoped>
.custom-toast {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    color: white;
}

.custom-toast.success {
    background-color: #28a745;
}

.custom-toast.error {
    background-color: #dc3545;
}

.custom-toast.warning {
    background-color: #ffc107;
}

.custom-toast button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
}
</style>
