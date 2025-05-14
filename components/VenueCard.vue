<script setup>
const props = defineProps({
  venue: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const navigateToVenue = () => {
  router.push(`/venue/${props.venue.id}`);
}
</script>

<template>
  <div class="card overflow-hidden group cursor-pointer " @click="navigateToVenue">
    <div class="relative overflow-hidden aspect-video">
      <NuxtImg
        loading="lazy"
        :src="venue.imageUrl"
        :alt="venue.name"
        class="w-full h-full object-cover transition-transform duration-300"
      />
    </div>
    <div class="p-2">
      <h2 class="text-base font-bold">{{ venue.name }}</h2>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:location"/>
        <span class="text-sm">{{ venue.location }}</span>
      </div>
      <div class="flex gap-2 items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:cursor"/>
        <span class="text-sm">{{ venue.distance }} км от вас</span>
      </div>
    </div>
  </div>
</template>

