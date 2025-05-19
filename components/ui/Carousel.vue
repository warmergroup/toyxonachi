<script setup lang="ts">
const props = defineProps<{ items: string[] }>()
</script>

<template>
  <div class="relative w-full max-w-screen-xl mx-auto rounded-xl">
    <UCarousel
      v-slot="{ item }"
      :items="props.items" loop arrows dots :autoplay="{ delay: 4000 }" :ui="{
        arrows: 'absolute inset-0 flex items-center justify-between z-10',
        prev: 'bg-white/50 hover:bg-white text-black rounded-full p-1 md:p-2 md:ml-20',
        next: 'bg-white/50 hover:bg-white text-black rounded-full p-1 md:p-2 md:mr-20',
        dots: 'mb-8  md:mb-10'
      }">
      <NuxtImg :src="item" class="w-full aspect-video object-cover rounded-xl"/>
    </UCarousel>
  </div>
</template>
