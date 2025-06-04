<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useToyxonalarStore } from '~/stores/toyxonalar.store';
import { useI18n } from 'vue-i18n';
import type { IToyxonalar } from '~/interfaces';
import { useScreenSize } from '~/hooks/useScreenSize';
import { getToyxonaById } from '~/query/getToyxonaById';
import { useLocationStore } from '~/stores/location.store';
import { getDistanceFromLatLonInKm } from '~/utils/distance'
import { useGetTariflarQuery } from "~/query/getTariflar";
import { UiTarifDrawer } from '#components';
import { useRouter } from 'vue-router';

const router = useRouter();

const { isLargeScreen } = useScreenSize()
const { t } = useI18n();
const route = useRoute();
const toyxonalarStore = useToyxonalarStore();
const toyxona = computed<IToyxonalar | undefined>(() => toyxonalarStore.getToyxonaById(route.params.id as string));
const { data: tariflar } = useGetTariflarQuery(route.params.id as string)
const error = ref<string | null>(null);
const locationStore = useLocationStore()

console.log("Tariflar index sahifada: ", tariflar.value);
console.log("Router id: ", route.params.id);

// Drawer state for tariff details
const selectedTarif = ref<any>(null);
const isDrawerOpen = ref(false);

const userDistance = computed(() => {
  if (
    locationStore.coords &&
    toyxona.value &&
    toyxona.value.latitude &&
    toyxona.value.longitude
  ) {
    return getDistanceFromLatLonInKm(
      locationStore.coords.latitude,
      locationStore.coords.longitude,
      Number(toyxona.value.latitude),
      Number(toyxona.value.longitude)
    )
  }
  return null
})

const goback = () => {
  router.go(-1);
};

const shareLink = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Venue',
      text: 'Check out this venue!',
      url: window.location.href,
    })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Link copied to clipboard!'))
      .catch((error) => console.error('Error copying link:', error));
  } else {
    alert('Sharing is not supported on this device. Please copy the link manually: ' + window.location.href);
  }
};

// Sahifa yuklanganda ma'lumotlarni yuklash
onMounted(async () => {
  try {
    if (!toyxona.value) {
      const data = await getToyxonaById(route.params.id as string)
      if (data) {
        toyxonalarStore.addToyxona(data.toyxonalar)
      } else {
        error.value = t('venue.notFound')
      }
    }
    console.log('Toyxona ma\'lumotlari yuklandi:', toyxonalarStore.getToyxonaById(route.params.id as string));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error.value = t('common.error');
  }
});

// const imageHeight = ref(0); // Rasm balandligini saqlash uchun
// const imageRef = ref<HTMLDivElement | null>(null); // Rasm elementiga murojaat qilish uchun

// onMounted(() => {
//   if (imageRef.value) {
//     imageHeight.value = imageRef.value.offsetHeight; // Rasm balandligini olish
//   }
// });
</script>

<template>
  <div v-if="error" class="flex items-center justify-center h-64">
    <p class="text-text-secondary">{{ error }}</p>
  </div>
  <div v-else-if="toyxona" class="lg:p-5 lg:pt-20 w-full h-full">

    <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
      <!-- Chap ustun (2/3) -->
      <div class="flex flex-col lg:gap-4 lg:col-span-2 lg:rounded-lg w-full h-full bg-white">
        <template v-if="isLargeScreen">
          <UiThumbnailGallery class="px-3 pt-3" :toyxona="toyxona" />
        </template>
        <!-- <div v-if="!isLargeScreen" class="fixed top-0 left-0 right-0 w-full h-auto">
          <UiCarousel :items="toyxona.images || []" />
        </div> -->
        <div v-if="!isLargeScreen" ref="imageRef" class="sticky top-0 w-full h-auto">
          <div class="relative">
            <UiCarousel v-if="toyxona.images && toyxona.images.length > 1" :items="toyxona.images" :rounded="false"
              :is-arrow="false" />
            <NuxtImg v-else-if="toyxona.images && toyxona.images.length > 0" :src="toyxona.images[0]"
              :alt="toyxona.name" class="w-full aspect-video object-cover" />

            <div
              class="absolute w-full h-full top-0 left-0 p-3 inset-0 bg-gradient-to-b from-black to-transparent opacity-30">
              <div class="flex items-center justify-between">
                <span
                  class="w-[36px] h-[36px] backdrop-blur-md bg-white/40 rounded-full p-2 cursor-pointer flex items-center justify-center"
                  @click="goback()">
                  <Icon name="custom:back-white" />
                </span>

                <span
                  class="w-[36px] h-[36px] backdrop-blur-md bg-white/40 rounded-full p-2 cursor-pointer flex items-center justify-center"
                  @click="shareLink">
                  <Icon name="custom:share-icon" />
                </span>
              </div>

            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3 p-3 z-10 bg-white rounded-t-2xl">
          <h1>{{ toyxona.name }}</h1>
          <p>{{ toyxona.address }}</p>
          <p v-if="userDistance" class="text-text-secondary">
            {{ userDistance.toFixed(1) }} km {{ t('common.fromYou') }}
          </p>

          <!-- Tariffs -->
          <h2 class="font-medium text-lg text-text-primary mb-4">{{ t('venue.tariffs') }}</h2>
          <UiTarifCard v-for="tarif in tariflar || []" :key="tarif.id" :tarif="tarif"
            @open-drawer="(tarif) => { selectedTarif = tarif; isDrawerOpen = true; }" />
          <UiTarifDrawer v-if="selectedTarif" :open="isDrawerOpen" :tarif="selectedTarif" :drawerType="'tarif'"
            @update:open="isDrawerOpen = $event" @close="isDrawerOpen = false" />
          <div class="">
            <h2 class="font-medium text-lg">{{ t('venue.description') }}</h2>
            <span>{{ toyxona.description }}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis hic,
              nobis placeat nisi ipsam libero
              id
              provident corrupti quisquam dolores ratione ducimus rerum facere nemo quos eaque quidem adipisci
              accusantium aut!
              Nihil quaerat, qui quis dolor eius enim quod doloribus autem, hic vero porro id aut labore nesciunt quas
              itaque!
            </span>
          </div>
        </div>
      </div>
      <!-- O‘ng ustun (1/3) -->
      <div class="flex flex-col gap-4">
        <!-- Map -->
        <div class="bg-white lg:rounded-lg shadow-sm p-4">
          <h2 class="text-xl font-bold text-text-primary mb-4 capitalize ">{{ t('venue.location') }}</h2>
          <div class="bg-gray-100 rounded-lg overflow-hidden mb-4">
            <YandexMap :center="{ lat: toyxona.latitude, lng: toyxona.longitude }" :title="toyxona.name"
              class="w-full h-48" />
            <!-- {{ toyxona.latitude }}, {{ toyxona.longitude }} -->
          </div>
          <div class="flex items-center text-text-secondary mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ toyxona.address }}</span>
          </div>
          <UButton class="w-full py-2 flex items-center justify-center">
            <span class="text-text-primary">{{ t('venue.goDirection') }}</span>
            <Icon name="custom:chevron-right" />
          </UButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mx-auto mt-50vh flex items-center justify-center h-64">
    <p class="text-text-secondary">{{ t('common.loading') }}</p>
  </div>
</template>
