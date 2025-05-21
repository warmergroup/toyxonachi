<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGetBannersQuery } from '~/query/getBanners'
import { useInfiniteToyxonalarQuery } from '~/query/getToyxonalar'

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
})
</script>

<template>
  <section class="space-y-3 bg-[var(--background-color)]">
    <client-only>
      <UiCarousel v-if="banners && (banners as any[]).length > 0" :items="(banners as any[]).map(b => b.photo)" />
      <USkeleton v-else-if="isBannersLoading && (!banners || (banners as any[]).length === 0)"
        class="w-full aspect-video rounded-xl mb-4" />
    </client-only>

    <h2 class="text-xl font-bold text-text-primary">{{ t('common.venues') }}</h2>

    <div v-if="isLoading" class="fixed w-full h-full flex flex-col items-center justify-center ">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      <p class="mt-4 text-lg text-gray-600">{{ t('common.loading') }}</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
    <div v-else-if="toyxonalar.length === 0" class="text-center text-gray-500">
      {{ t('venue.notFound') }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona" />
    </div>
    <div ref="infiniteScrollTrigger"></div>
    <USkeleton v-if="isFetchingNextPage" class="w-full h-20 my-4" />
  </section>
</template>
