<script setup lang="ts">
import type {IToyxonalar} from "~/interfaces";

const localePath = useLocalePath()
const props = defineProps<{
  toyxona: IToyxonalar;
}>();

const {t} = useI18n();

const navigateToVenue = () => {
  navigateTo(localePath(`/venue/${props.toyxona.id}`));
}
</script>

<template>
  <div class="card overflow-hidden group cursor-pointer rounded-xl" @click="navigateToVenue">
    <div class="relative overflow-hidden aspect-video">
      <template v-if="toyxona.images && toyxona.images.length > 0">
        <NuxtImg
          class="w-full h-full aspect-video object-cover rounded-b-xl transition-transform duration-300"
          loading="lazy" :src="toyxona.images?.[0]" :alt="toyxona.name"/>
      </template>
      <template v-else>
        <USkeleton class="w-full h-full aspect-video rounded-b-xl"/>
      </template>
    </div>
    <div class="p-2">
      <h2 class="text-base font-bold">{{ toyxona.name }}</h2>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:location"/>
        <span class="text-sm">{{ toyxona.address || t('venue.noAddress') }}</span>
      </div>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:cursor"/>
        <span class="text-sm">{{ toyxona.min_price }} - {{ toyxona.max_price }} {{ t('common.distance') }}</span>
      </div>
    </div>
  </div>
</template>
