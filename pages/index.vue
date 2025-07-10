<script setup lang="ts">
import { useInfiniteToyxonalarQuery } from '~/data'
import { getDiscounts } from "~/data"
import { useSearchStore } from '~/stores/search.store'
useHead({
  title: 'Toyxonachi — Eng yaxshi to‘yxonalar va banket zallari',
  meta: [
    { name: 'description', content: 'O‘zbekistondagi eng yaxshi to‘yxonalar, narxlar, joylashuv va chegirmalar. Toyxonachi bilan orzuingizdagi to‘yxonani toping!' },
    { name: 'keywords', content: 'toyxona, banket zali, to‘yxonalar, narxlar, chegirma, uzbekistan, tashkent, Samarqand', },
    { property: 'og:title', content: 'Toyxonachi — Eng yaxshi to‘yxonalar' },
    { property: 'og:description', content: 'O‘zbekistondagi eng yaxshi to‘yxonalar va narxlar.' },
    { property: 'og:image', content: '/logo-splash.svg' },
    { property: 'og:url', content: 'https://toyxonachi.uz/' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

const searchStore = useSearchStore()
const { isLargeScreen } = useScreenSize();
const { t } = useI18n()
const router = useRouter()
const { data: toyxonalarData, isLoading: toyxonaLoading, fetchNextPage, isFetchingNextPage, error } = useInfiniteToyxonalarQuery()
const { data: banners, isLoading: isBannersLoading } = getDiscounts()
const infiniteScrollTrigger = ref<null | HTMLElement>(null)
const toyxonalar = computed(() => (toyxonalarData.value?.pages || []).flat())

const filteredToyxonalar = computed(() => {
  if (!searchStore.query) return toyxonalar.value
  return toyxonalar.value.filter(t =>
    t.name?.toLowerCase().includes(searchStore.query.toLowerCase())
    // yoki boshqa maydonlar bo‘yicha ham filter qilishingiz mumkin
  )
})

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
      <USkeleton v-if="isBannersLoading" class="w-full aspect-video lg:h-80 my-4 bg-gray-500" />
      <div v-if="carouselItems.length" class="container mx-auto lg:px-10">
        <UiCarousel :items="carouselItems" :rounded="true" :arrows="true" :is-loading="isBannersLoading"
          :on-item-click="handleBannerClick" />
      </div>

      <h2 v-if="!toyxonaLoading && toyxonalar && toyxonalar.length > 0"
        class="text-xl font-bold text-text-primary py-2">{{ t('common.weddingHalls') }}</h2>

      <div v-if="error" class="text-center text-red-500">
        {{ error?.message || t('common.error') }}
      </div>

      <div v-if="toyxonaLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <UiCardPlaceholder v-for="n in 8" :key="`placeholder-${n}`" />
      </div>

      <div v-if="toyxonalar && toyxonalar.length > 0 && !toyxonaLoading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <VenueCard v-for="toyxona in filteredToyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona" />
      </div>

      <div v-else-if="!toyxonaLoading && (!toyxonalar || toyxonalar.length === 0)"
        class="text-center text-gray-500 py-10">
        {{ t('weddingHall.notFound') }}
      </div>

      <div ref="infiniteScrollTrigger">
        <USkeleton v-if="isFetchingNextPage" class="w-full h-20 my-4" />
      </div>
    </section>
  </div>
</template>
