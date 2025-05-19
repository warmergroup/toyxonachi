<script lang="ts" setup>
import type {IToyxonalar} from '~/interfaces'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  toyxona: IToyxonalar;
}>()
const selectedImage = ref<string | null>(null);
</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <div
        v-for="(image, index) in toyxona.images"
        :key="index"
        class="w-[80px] h-[80px] rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
        :class="selectedImage === image ? 'border-[var(--primary-color)]' : 'border-transparent'"
        @click="selectedImage = image"
      >
        <NuxtImg
          :src="image"
          :alt="`image ${index + 1}`"
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <div class="relative w-full rounded-lg overflow-hidden">
      <NuxtImg
        :src="selectedImage || toyxona?.images?.[0]" :alt="toyxona.name" class="w-full aspect-video object-cover"
        loading="lazy"/>
      <div
        class="absolute flex flex-col bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent lg:p-6">
        <div class="flex gap-2 items-center">
          <h1 class="text-3xl font-bold text-white">{{ toyxona.name }}</h1>
        </div>
        <div class="flex items-center">
          <div class="text-white flex gap-5">
            <span>{{ toyxona.address || 'Manzil kiritilmagan' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>