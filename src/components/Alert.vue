<template>
    <div
        v-if="show"
        :class="`fixed bottom-5 right-5 z-50 ${bg} ${color} p-4 rounded-3xl shadow-lg`"
        role="alert"
    >
        <strong>{{ status }}</strong> — {{ message }}
    </div>
</template>

<script setup>
const props = defineProps(['show', 'bg', 'color', 'message', 'status']);
</script>
