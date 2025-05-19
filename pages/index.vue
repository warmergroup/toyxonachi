<script setup lang="ts">
import {useToyxonalarStore} from "~/stores/toyxonalar.store";
import {useGetToyxonalarQuery} from "~/query/getToyxonalar";
import {useI18n} from 'vue-i18n';

const {isLoading, error} = useGetToyxonalarQuery(0, 10);
const toyxonalarStore = useToyxonalarStore();
const toyxonalar = computed(() => toyxonalarStore.toyxonalar);

const {t} = useI18n()

</script>


<template>
  <section class="space-y-3 bg-[var(--background-color)]">
    <h2 class="text-xl font-bold text-text-primary">{{ t('common.venues') }}</h2>
    <div v-if="isLoading" class="fixed w-full h-full flex flex-col items-center justify-center ">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      <p class="mt-4 text-lg text-gray-600">{{ t('common.loading') }}</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
    <div v-else-if="toyxonalar.length === 0" class="text-center text-gray-500">
      {{ t('venue.notFound') }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona"/>
    </div>
  </section>
</template>
