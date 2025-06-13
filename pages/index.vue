<script setup lang="ts">

import {useInfiniteToyxonalarQuery} from '~/api/getToyxonalar'
import {useCurrentPosition} from '~/hooks/useCurrentPosition'
import {useLocationStore} from '~/stores/location.store'
import {useToyxonalarStore} from '~/stores/toyxonalar.store'
import {useScreenSize} from '~/hooks/useScreenSize';
import {getDisCounts} from "~/api/getDiscounts";
import {useRouter} from 'vue-router'

const {t} = useI18n()
const router = useRouter();
const {isLargeScreen} = useScreenSize();
const toyxonalarStore = useToyxonalarStore();
const {fetchNextPage, isFetchingNextPage, error: queryError} = useInfiniteToyxonalarQuery(12)
const infiniteScrollTrigger = ref<null | HTMLElement>(null)
const {data: banners, isLoading: isBannersLoading} = getDisCounts();
const toyxonalar = computed(() => toyxonalarStore.toyxonalar);
const isLoading = computed(() => toyxonalarStore.isLoading);
const error = computed(() => queryError.value || toyxonalarStore.error)
const {getCurrentPosition, coords, error: positionError} = useCurrentPosition()
const locationStore = useLocationStore()

const carouselItems = computed(() =>
  (banners.value as any[] || []).map(b => ({
    src: b.image_url,
    id: b.id,
    wedding_hall_id: b.wedding_hall_id
  }))
)

function handleBannerClick(item: { wedding_hall_id?: string | number }) {
  if (item.wedding_hall_id) {
    router.push(`/toyxona/${item.wedding_hall_id}`)
  }
}

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
  <div class="pb-20">
    <LayoutsMobileTopbar v-if="!isLargeScreen" class=""/>
    <section class="space-y-3 bg-[var(--background-color)] px-5 pt-20">

      <div v-if="carouselItems.length" class="container mx-auto lg:px-10">
        <UiCarousel
          :items="carouselItems" :rounded="true" :arrows="true" :is-loading="isBannersLoading"
          :on-item-click="handleBannerClick"/>
      </div>

      <h2 class="text-xl font-bold text-text-primary py-2">{{ t('common.venues') }}</h2>
      <div v-if="error" class="text-center text-red-500">{{ error?.message || t('common.error') }}</div>
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiCardPlaceholder v-for="n in 8" :key="`placeholder-${n}`"/>
      </div>
      <div
        v-if="toyxonalar && toyxonalar.length > 0 && !isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona"/>
      </div>
      <div v-else-if="!isLoading && (!toyxonalar || toyxonalar.length === 0)" class="text-center text-gray-500 py-10">
        {{ t('venue.notFound') }}
      </div>
      <div ref="infiniteScrollTrigger"/>
      <USkeleton v-if="isFetchingNextPage" class="w-full h-20 my-4"/>
    </section>
  </div>
</template>
