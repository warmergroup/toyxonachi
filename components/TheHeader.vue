<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center space-x-6">
        <NuxtLink to="/" class="text-xl font-bold text-primary hover:text-primary/90 transition">
          VenueFinder
        </NuxtLink>
        <nav class="hidden md:flex space-x-6">
          <a class="text-text-primary hover:text-primary transition font-medium"
             active-class="text-primary">
            To'yxonalar
          </a>
        </nav>
      </div>
      <div class="flex items-center space-x-4">
        <SearchBar class="hidden md:block"/>
        <div class="flex items-center space-x-2">
          <button class="text-text-primary hover:text-primary transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </button>
          <button class="md:hidden text-text-primary hover:text-primary transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header component
</script>