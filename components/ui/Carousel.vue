<script setup lang="ts">
const items = [
  'https://picsum.photos/1920/500?random=1',
  'https://picsum.photos/1920/500?random=2',
  'https://picsum.photos/1920/500?random=3',
  'https://picsum.photos/1920/500?random=4',
  'https://picsum.photos/1920/500?random=5',
  'https://picsum.photos/1920/500?random=6'
]
</script>

<template>
  <div class=" relative w-full max-w-screen-xl mx-auto">
    <UCarousel
      v-slot="{ item }"
      :items="items"

      loop
      arrows
      dots
      :autoplay="{ delay: 3500 }"
      :ui="{
        arrows: 'absolute inset-0 flex items-center justify-between z-10',
        prev: 'bg-white/70 hover:bg-white text-black rounded-full p-2 md:ml-15',
        next: 'bg-white/70 hover:bg-white text-black rounded-full p-2 md:mr-15',
        dots: 'hidden md:block mb-8  md:mb-10'
      }"
    >
      <NuxtImg :src="item" class="w-full h-full object-cover rounded-lg"/>
    </UCarousel>
  </div>
</template>
