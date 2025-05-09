<template>
  <div v-if="venue">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Gallery and Basic Info -->
      <div class="lg:col-span-2">
        <!-- Main Image -->
        <div class="relative rounded-lg overflow-hidden mb-4">
          <img
            :src="selectedImage || venue.images[0]"
            :alt="venue.name"
            class="w-full h-80 object-cover"
          >
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 class="text-3xl font-bold text-white">{{ venue.name }}</h1>
            <div class="flex items-center mt-2">
              <div class="flex items-center text-yellow-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-white ml-1">{{ venue.rating }} из {{ venue.reviewCount }}</span>
              </div>
              <div class="flex items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ venue.distance }} км от вас</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Thumbnail Gallery -->
        <div class="grid grid-cols-4 gap-2 mb-8">
          <div
            v-for="(image, index) in venue.images"
            :key="index"
            class="rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200"
            :class="selectedImage === image ? 'border-primary' : 'border-transparent'"
            @click="selectedImage = image"
          >
            <img
              :src="image"
              :alt="`${venue.name} - image ${index + 1}`"
              class="w-full h-20 object-cover"
            >
          </div>
        </div>

        <!-- Description Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-bold text-text-primary mb-4">Описание</h2>
          <p class="text-text-secondary">{{ venue.description }}</p>
          <button class="text-primary font-medium mt-2">Читать еще »</button>
        </div>

        <!-- Reviews Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-text-primary">Отзывы</h2>
            <span class="text-text-secondary">{{ venue.reviewCount }} отзывов</span>
          </div>
          <div class="mb-4">
            <div class="flex items-center text-yellow-400">
              <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                   fill="currentColor">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="ml-2 text-text-primary font-medium">{{ venue.rating }} из 5</span>
            </div>
          </div>
          <button
            class="w-full py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition">
            Смотреть все отзывы
          </button>
        </div>
      </div>

      <!-- Right Column - Pricing and Additional Info -->
      <div>
        <!-- Pricing Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-bold text-text-primary mb-4">Тарифлар</h2>
          <div class="space-y-4">
            <PriceCard
              v-for="(price, index) in venue.prices"
              :key="index"
              :price="price"
            />
          </div>
        </div>

        <!-- Location Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-bold text-text-primary mb-4">Расположение</h2>
          <div class="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <!-- Map Placeholder -->
            <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Map" class="w-full h-full object-cover">
            </div>
          </div>
          <div class="flex items-center text-text-secondary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ venue.address }}</span>
          </div>
          <div class="flex items-center text-text-secondary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ venue.distance }} км от вас</span>
          </div>
          <button
            class="w-full py-2 border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Построить маршрут
          </button>
        </div>

        <!-- Contact/Booking Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <button class="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition mb-4">
            Алоқага чиқиш
          </button>
          <div class="flex justify-between">
            <button
              class="flex-1 py-2 mr-2 border border-gray-300 rounded-lg text-text-secondary hover:bg-gray-50 transition flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Share
            </button>
            <button
              class="flex-1 ml-2 py-2 border border-gray-300 rounded-lg text-text-secondary hover:bg-gray-50 transition flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-64">
    <p class="text-text-secondary">Loading venue information...</p>
  </div>
</template>

<script setup>
import {useVenueStore} from '~/stores/venue';

const route = useRoute();
const venueStore = useVenueStore();
const venue = computed(() => venueStore.getVenueById(route.params.id));
const selectedImage = ref(null);
</script>