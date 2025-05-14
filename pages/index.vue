<script setup>
import {useVenueStore} from '~/stores/venue';
import {useToyxonalarStore} from "~/stores/toyxonalar.store.js";
import {useGetToyxonalarQuery} from "~/query/getToyxonalar.js";

const toyxonalarStore = useToyxonalarStore();
const {isLoading, error, refetch} = useGetToyxonalarQuery()
const toyxonalar = toyxonalarStore.data;
console.log("to'yxonalar: ", toyxonalar);
const venueStore = useVenueStore();
const venues = venueStore.venues;
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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VenueCard
          v-for="venue in venues.slice(0, 8)"
          :key="`wedding-${venue.id}`"
          :venue="venue"
        />
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

