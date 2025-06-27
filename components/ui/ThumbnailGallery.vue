<script lang="ts" setup>
import type { IToyxonalar } from '~/interfaces'

const { t } = useI18n()
const props = defineProps<{
  toyxona: IToyxonalar;
}>()
const selectedImage = ref<string | null>(null);
const images = computed(() => props.toyxona.wedding_hall_pictures.map(i => i.image_url))
</script>

<template>
  <div class="flex gap-2">
    <!-- select image section -->
    <div v-if="images.length > 1" class="flex flex-col gap-2">
      <div v-for="(image, index) in images" :key="index"
        class="w-[80px] h-[80px] rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
        :class="selectedImage === image ? 'border-[var(--primary-color)]' : 'border-transparent'"
        @click="selectedImage = image">
        <NuxtImg :src="image" :alt="`image ${index + 1}`" loading="lazy" class="w-full h-full object-cover"
          placeholder />
      </div>
    </div>

    <!-- main image section -->
    <div class="relative w-full rounded-lg overflow-hidden min-h-[200px] flex items-center justify-center">
      <template v-if="images.length > 0">
        <NuxtImg :src="selectedImage || images[0]" :alt="props.toyxona.name" class="w-full aspect-video object-cover"
          loading="lazy" placeholder />
      </template>
      <template v-else>
        <div class="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 aspect-video">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11a4 4 0 118 0 4 4 0 01-8 0z" />
          </svg>
          <span>Rasm mavjud emas</span>
        </div>
      </template>
      <div v-if="images.length > 0"
        class="absolute flex flex-col bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent lg:p-6">
        <div class="flex gap-2 items-center">
          <h1 class="text-2xl font-bold text-white">{{ props.toyxona.name }}</h1>
        </div>
        <div class="flex items-center">
          <div class="text-white flex gap-5">
            <span>{{ props.toyxona.address || t('venue.noAddress') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>