<script setup lang="ts">
const props = defineProps<{ items: string[] }>()
</script>

<template>
  <div class="relative w-full max-w-screen-xl mx-auto rounded-xl">
    <UCarousel
      v-slot="{ item }" :items="props.items" loop :arrows="props.items.length > 1"
      :dots="props.items.length > 1" :autoplay="props.items.length > 1 ? { delay: 4000 } : false" :ui="{
        arrows: 'absolute inset-0 flex items-center justify-between z-10',
        prev: 'bg-white/50 hover:bg-white text-black rounded-full p-1 md:p-2 md:ml-20',
        next: 'bg-white/50 hover:bg-white text-black rounded-full p-1 md:p-2 md:mr-20',
        dots: 'mb-8  md:mb-10'
      }">
      <NuxtImg v-if="item.length > 0" :src="item" class="w-full aspect-video lg:h-80 object-cover rounded-xl"/>
      <USkeleton v-else class="w-full h-full aspect-video rounded-xl"/>
    </UCarousel>
  </div>
</template>
