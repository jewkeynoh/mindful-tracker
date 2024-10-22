<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const isOpen = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);
const dropdownContainer = ref(null);
const dropdownTop = ref(0);
const dropdownLeft = ref(0);
const dropdownPositionClass = ref('');

const props = defineProps({
    customClass: {
        type: String,
        default: null
    }
});

// Toggle the dropdown visibility
function toggleDropdown() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      adjustDropdownPosition();
    });
  }
}

// Adjust dropdown position to ensure it doesn't go off-screen
function adjustDropdownPosition() {
  const buttonRect = dropdownButton.value.getBoundingClientRect();
  const menuRect = dropdownMenu.value.getBoundingClientRect();
  const containerRect = dropdownContainer.value.getBoundingClientRect();
  
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const margin = 12; // Space between button and dropdown

  // Calculate top position
  if (buttonRect.bottom + menuRect.height > viewportHeight) {
    // Dropdown goes above the button with a margin
    dropdownTop.value = buttonRect.top - menuRect.height - containerRect.top - margin;
    dropdownPositionClass.value = 'bottom-auto';
  } else {
    // Dropdown goes below the button with a margin
    dropdownTop.value = buttonRect.bottom - containerRect.top;
    dropdownPositionClass.value = 'top-auto';
  }

  // Calculate left position
  if (buttonRect.left + menuRect.width > viewportWidth) {
    // Align the dropdown to the right side of the button
    dropdownLeft.value = buttonRect.right - menuRect.width - containerRect.left;
  } else {
    // Align the dropdown to the left side of the button
    dropdownLeft.value = buttonRect.left - containerRect.left;
  }
}

// Close the dropdown
function closeDropdown() {
  isOpen.value = false;
}

// Close the dropdown when clicking outside
function handleClickOutside(event) {
  if (
    !dropdownButton.value.contains(event.target) &&
    !dropdownMenu.value.contains(event.target)
  ) {
    closeDropdown();
  }
}

// Setup event listeners
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

// Cleanup event listeners
onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="relative" ref="dropdownContainer">
        <button ref="dropdownButton" @click="toggleDropdown" class="flex items-center rounded">
            <slot name="buttonContent"></slot>
        </button>
        <div v-show="isOpen" ref="dropdownMenu" :class="[dropdownPositionClass, customClass]"
            class="absolute mt-2 w-48 bg-white divide-y divide-gray-200 rounded-xl shadow border border-gray-300"
            :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
/* Optional styles for positioning */
</style>