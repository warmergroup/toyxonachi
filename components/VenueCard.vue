<script setup lang="ts">
interface IToyxona {
  id: string;
  name: string;
  image: string;
  description: string;
  min_price: string;
  max_price: string;
  address: string;
}

const props = defineProps<{
  toyxona: IToyxona;
}>();

const {t} = useI18n();
const router = useRouter();

const navigateToVenue = () => {
  router.push(`/venue/${props.toyxona.id}`);
}
</script>

<template>
  <div class="card overflow-hidden group cursor-pointer" @click="navigateToVenue">
    <div class="relative overflow-hidden aspect-video">
      <NuxtImg
        class="w-full h-full aspect-video object-cover rounded-lg transition-transform duration-300"
        loading="lazy"
        :src="toyxona.image"
        :alt="toyxona.name"/>
    </div>
    <div class="p-2">
      <h2 class="text-base font-bold">{{ toyxona.name }}</h2>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:location"/>
        <span class="text-sm">{{ toyxona.address || t('venue.noAddress') }}</span>
      </div>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:cursor"/>
        <span class="text-sm">{{ toyxona.min_price }} - {{ toyxona.max_price }} {{ t('common.currency') }}</span>
      </div>
    </div>
  </div>
</template>
