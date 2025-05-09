<template>
  <div class="">
    <section class="mb-12">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold ">Популярные места</h1>
        <div class="block">
          <SearchBar/>
        </div>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VenueCard
          v-for="venue in venues"
          :key="venue.id"
          :venue="venue"
        />
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-text-primary mb-6">To'yxonalar</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VenueCard
          v-for="venue in venues.slice(0, 4)"
          :key="`wedding-${venue.id}`"
          :venue="venue"
        />
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-text-primary mb-6">Кафе</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VenueCard
          v-for="venue in venues.slice(0, 4).reverse()"
          :key="`cafe-${venue.id}`"
          :venue="venue"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import {useVenueStore} from '~/stores/venue';

const venueStore = useVenueStore();
const venues = venueStore.venues;
</script>