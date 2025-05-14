<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
    <div
      class="flex justify-between items-center p-4 cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <h3 class="font-medium text-text-primary">{{ price.title }}</h3>
      <div class="flex items-center gap-2">
        <span class="text-text-primary font-medium">{{ price.amount }} {{ price.currency }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-text-tertiary transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="p-4 bg-gray-50 border-t border-gray-100"
    >
      <p class="text-text-secondary text-sm">{{ price.description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  price: {
    type: Object,
    required: true
  }
});

const isOpen = ref(false);
</script>