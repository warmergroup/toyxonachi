<template>
  <div class="relative flex-grow max-w-md">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
    <input
      type="text"
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
      placeholder="Qidirish..."
      v-model="searchQuery"
      @input="onSearch"
    >
  </div>
</template>

<script setup>
const searchQuery = ref('');

const onSearch = () => {
  // Implement search functionality
  console.log('Searching for:', searchQuery.value);
}
</script>