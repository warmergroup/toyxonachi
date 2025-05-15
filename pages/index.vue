<script setup lang="ts">
// import {useVenueStore} from '~/stores/venue';
import { useToyxonalarStore } from "~/stores/toyxonalar.store";
import { useGetToyxonalarQuery } from "~/query/getToyxonalar";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const toyxonalarStore = useToyxonalarStore();
const { isLoading, error, data } = useGetToyxonalarQuery(0, 10);
const toyxonalar = computed(() => toyxonalarStore.toyxonalar);
// const venueStore = useVenueStore();
// const venues = venueStore.venues;

const { t } = useI18n()
</script>


<template>
  <div class="">
    <!--    <section class="mb-12">-->
    <!--            <UiCarousel/>-->
    <!--    </section>-->

    <!--    <section class="mb-12">-->
    <!--      <div class="flex justify-between items-center mb-6">-->
    <!--        <h1 class="text-2xl font-bold ">Популярные места</h1>-->
    <!--      </div>-->
    <!--      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">-->
    <!--        <VenueCard-->
    <!--          v-for="venue in venues"-->
    <!--          :key="venue.id"-->
    <!--          :venue="venue"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </section>-->

    <section class="mb-40">
      <h2 class="text-2xl font-bold text-text-primary mb-6">To'yxonalar</h2>
      <div v-if="isLoading" class="text-center">Yuklanmoqda...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
      <div v-else-if="toyxonalar.length === 0" class="text-center text-gray-500">
        To'yxonalar topilmadi
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VenueCard v-for="toyxona in toyxonalar" :key="`wedding-${toyxona.id}`" :toyxona="toyxona" />
      </div>
    </section>

    <!--    <section>-->
    <!--      <h2 class="text-2xl font-bold text-text-primary mb-6">Кафе</h2>-->
    <!--      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">-->
    <!--        <VenueCard-->
    <!--          v-for="venue in venues.slice(0, 4).reverse()"-->
    <!--          :key="`cafe-${venue.id}`"-->
    <!--          :venue="venue"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </section>-->
  </div>
</template>
