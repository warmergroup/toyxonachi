<script setup lang="ts">
import { useInfiniteToyxonalarQuery } from '~/api/toyxonalar'
import { useLocationStore } from '~/stores/location.store'
import { useToyxonalarStore } from '~/stores/toyxonalar.store'
import { getDiscounts } from "~/api/discounts"

const { t } = useI18n()
const router = useRouter()
const toyxonalarStore = useToyxonalarStore()
const locationStore = useLocationStore()
const { fetchNextPage, isFetchingNextPage, error: queryError } = useInfiniteToyxonalarQuery(12)
const { data: banners, isLoading: isBannersLoading } = getDiscounts()

const infiniteScrollTrigger = ref<null | HTMLElement>(null)
const toyxonalar = computed(() => toyxonalarStore.toyxonalar)
const isLoading = computed(() => toyxonalarStore.isLoading)
const error = computed(() => queryError.value || toyxonalarStore.error)
const { isLargeScreen } = useScreenSize();

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
  const { getCurrentPosition } = useCurrentPosition()
  getCurrentPosition()

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
})
</script>

<template>
  <div class="pb-20">
    <LayoutsMobileTopbar v-if="!isLargeScreen" />
    <section class="space-y-3 bg-[var(--background-color)] px-5 pt-20">
      <div v-if="carouselItems.length" class="container mx-auto lg:px-10">
        <UiCarousel :items="carouselItems" :rounded="true" :arrows="true" :is-loading="isBannersLoading"
          :on-item-click="handleBannerClick" />
      </div>

      <h2 class="text-xl font-bold text-text-primary py-2">{{ t('common.venues') }}</h2>

      <div v-if="error" class="text-center text-red-500">
        {{ error?.message || t('common.error') }}
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiCardPlaceholder v-for="n in 8" :key="`placeholder-${n}`" />
      </div>

      <div v-if="toyxonalar && toyxonalar.length > 0 && !isLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona" />
      </div>

      <div v-else-if="!isLoading && (!toyxonalar || toyxonalar.length === 0)" class="text-center text-gray-500 py-10">
        {{ t('venue.notFound') }}
      </div>

      <div ref="infiniteScrollTrigger" />
      <USkeleton v-if="isFetchingNextPage" class="w-full h-20 my-4" />
    </section>
  </div>
</template>
