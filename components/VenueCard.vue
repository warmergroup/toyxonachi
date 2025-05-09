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
  <div class="card overflow-hidden group cursor-pointer" @click="navigateToVenue">
    <div class="relative overflow-hidden aspect-video">
      <NuxtImg
        :src="venue.imageUrl"
        :alt="venue.name"
        class="w-full h-full object-cover transition-transform duration-300"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
        <h3 class="text-lg font-semibold">{{ venue.name }}</h3>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-center text-[var(--background-color)] mb-2">
        <UIcon name="custom:location"/>
        <span class="text-sm">{{ venue.location }}</span>
      </div>
      <div class="flex items-center text-[var(--text-secondary)]">
        <UIcon class="w-[14px] h-[14px]" name="custom:cursor"/>
        <span class="text-sm">{{ venue.distance }} км от вас</span>
      </div>
    </div>
  </div>
</template>

