<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGetBannersQuery } from '~/query/getBanners'
import { useInfiniteToyxonalarQuery } from '~/query/getToyxonalar'
import { useCurrentPosition } from '~/hooks/useCurrentPosition'
import { useLocationStore } from '~/stores/location.store'
import { useScreenSize } from '~/hooks/useScreenSize';

const { isLargeScreen } = useScreenSize();

const infiniteScrollTrigger = ref<null | HTMLElement>(null)
const { t } = useI18n()

const { data: banners, isLoading: isBannersLoading } = useGetBannersQuery()
const {
  data,
  isLoading,
  error,
  fetchNextPage,
  isFetchingNextPage
} = useInfiniteToyxonalarQuery(12)

const toyxonalar = computed(() => (data.value?.pages ? data.value.pages.flat() : []))

const { getCurrentPosition, coords, error: positionError } = useCurrentPosition()
const locationStore = useLocationStore()


onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isFetchingNextPage.value) {
      fetchNextPage()
    }
  })
  if (infiniteScrollTrigger.value) {
    observer.observe(infiniteScrollTrigger.value)
  }
  onUnmounted(() => {
    if (infiniteScrollTrigger.value) observer.unobserve(infiniteScrollTrigger.value)
  })

  getCurrentPosition()
  watch(coords, (val) => {
    if (val) locationStore.setCoords(val)
  })
  watch(positionError, (val) => {
    if (val) locationStore.setError(val)
  })
})
</script>

<template>
  <div>
    <LayoutsMobileTopbar v-if="!isLargeScreen" class="" />
    <section class="space-y-3 bg-[var(--background-color)] px-5 pt-20">

      <div class="container mx-auto lg:px-10">
        <UiCarousel v-if="banners && (banners as any[]).length > 0" :items="(banners as any[]).map(b => b.photo)"
          :rounded="true" :isArrows="true" />
      </div>

      <h2 class="text-xl font-bold text-text-primary py-2">{{ t('common.venues') }}</h2>
      <div v-if="error" class="text-center text-red-500">{{ error.message }}</div>
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiCardPlaceholder v-for="n in 8" :key="`placeholder-${n}`" />
      </div>
      <div v-if="toyxonalar" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona" />
      </div>
      <div v-if="toyxonalar.length === 0" class="text-center text-gray-500">
        {{ t('venue.notFound') }}
      </div>
      <div ref="infiniteScrollTrigger" />
      <USkeleton v-if="isFetchingNextPage" class="w-full h-20 my-4" />
    </section>
    
  </div>

</template>
