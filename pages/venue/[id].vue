<script setup lang="ts">
import {useToyxonalarStore} from '~/stores/toyxonalar.store';
import {useI18n} from 'vue-i18n';
import type {IToyxonalar} from '~/interfaces';
import {useScreenSize} from "~/hooks/useScreenSize";

const {isLargeScreen} = useScreenSize()
const {t} = useI18n();
const route = useRoute();
const toyxonalarStore = useToyxonalarStore();
const toyxona = computed<IToyxonalar | undefined>(() => toyxonalarStore.getToyxonaById(route.params.id as string));
const error = ref<string | null>(null);

// Sahifa yuklanganda ma'lumotlarni yuklash
onMounted(async () => {
  try {
    if (!toyxona.value) {
      error.value = t('venue.notFound');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error.value = t('common.error');
  }
});

</script>

<template>
  <div v-if="error" class="flex items-center justify-center h-64">
    <p class="text-text-secondary">{{ error }}</p>
  </div>
  <div v-else-if="toyxona">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Gallery and Basic Info -->
      <div class="lg:col-span-2">
        <!-- Main Image -->
        <template v-if="isLargeScreen">
          <UiThumbnailGallery :toyxona="toyxona"/>
        </template>
        <div class="relative w-full h-auto">
          <UiCarousel v-if="!isLargeScreen" :items="toyxona.images || []"/>
          <div class="absolute left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo iste ipsa similique iusto enim animi assumenda
            labore
            modi placeat vitae autem facilis reiciendis aut harum velit, dicta laboriosam at earum odio delectus
            inventore
            deserunt praesentium tenetur eveniet! Itaque, rerum explicabo cum fugiat et repudiandae labore adipisci
            libero
            distinctio impedit illo?
          </div>
        </div>
      </div>


      <!-- Right Column - Pricing and Additional Info -->
      <div>
        <!-- Additional Info Section -->
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
            <span>{{ toyxona.address }}</span>
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
        <!--  contact section end  -->

        <!-- Contact Section -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-bold text-text-primary mb-4">{{ t('venue.contact') }}</h2>
          <div class="space-y-4">
            <div class="flex items-center text-text-secondary">
              <UIcon class="w-5 h-5 mr-2" name="custom:phone"/>
              <span>{{ toyxona.phone1 }}</span>
            </div>
            <div class="flex items-center text-text-secondary">
              <UIcon class="w-5 h-5 mr-2" name="custom:phone"/>
              <span>{{ toyxona.phone2 }}</span>
            </div>
            <div v-if="toyxona.telegram_link" class="flex items-center text-text-secondary">
              <UIcon class="w-5 h-5 mr-2" name="custom:telegram"/>
              <a :href="toyxona.telegram_link" target="_blank" class="text-primary hover:underline">
                Telegram
              </a>
            </div>
            <div v-if="toyxona.instagram_link" class="flex items-center text-text-secondary">
              <UIcon class="w-5 h-5 mr-2" name="custom:instagram"/>
              <a :href="toyxona.instagram_link" target="_blank" class="text-primary hover:underline">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else class="flex items-center justify-center h-64">
    <p class="text-text-secondary">{{ t('common.loading') }}</p>
  </div>
</template>