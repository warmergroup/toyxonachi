<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const config = useRuntimeConfig();
const apiKey = config.public.yandexMapsApiKey;

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

interface Props {
  title?: string;
  addressPlaceholder?: string;
  initialLatitude?: number;
  initialLongitude?: number;
  zoom?: number;
}

declare global {
  interface Window {
    ymaps: any;
  }
}
const props = withDefaults(defineProps<Props>(), {
  title: 'Manzil',
  addressPlaceholder: 'Manzil tanlang...',
  initialLatitude: 41.2995,
  initialLongitude: 69.2401,
  zoom: 15
});

const emit = defineEmits<{
  locationChange: [location: LocationData];
}>();

const mapContainer = ref<HTMLElement>();
const currentAddress = ref<string>('');
const isLoading = ref<boolean>(true);

let yandexMap: any = null;
let updateTimeout: number | null = null;

// Skriptni faqat bir marta yuklash uchun
function loadYandexMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve();
      return;
    }
    // Skript allaqachon yuklanayotgan bo‘lsa, kutamiz
    if (document.getElementById('ymaps-script')) {
      const check = setInterval(() => {
        if (window.ymaps) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement('script');
    script.id = 'ymaps-script';
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=uz_UZ`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Yandex Maps API yuklanmadi'));
    document.head.appendChild(script);
  });
}

const initializeMap = async () => {
  if (!mapContainer.value) return;
  try {
    await loadYandexMapsScript();
    await new Promise<void>((resolve) => {
      window.ymaps.ready(() => resolve());
    });

    yandexMap = new window.ymaps.Map(mapContainer.value, {
      center: [props.initialLatitude, props.initialLongitude],
      zoom: props.zoom,
      controls: ['zoomControl', 'typeSelector']
    });

    yandexMap.events.add('boundschange', handleMapMove);

    await updateAddress(props.initialLatitude, props.initialLongitude);

    isLoading.value = false;
  } catch (error) {
    console.error('Error initializing Yandex Map:', error);
    currentAddress.value = 'Xarita yuklanmadi';
    isLoading.value = false;
  }
};

const handleMapMove = () => {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }
  updateTimeout = window.setTimeout(async () => {
    if (yandexMap) {
      const center = yandexMap.getCenter();
      await updateAddress(center[0], center[1]);
    }
  }, 300);
};

const updateAddress = async (latitude: number, longitude: number) => {
  try {
    if (!window.ymaps) throw new Error('Yandex Maps API not available');
    const geocodeResult = await window.ymaps.geocode([latitude, longitude], {
      kind: 'house',
      results: 1
    });
    const firstResult = geocodeResult.geoObjects.get(0);

    let address = '';
    if (firstResult) {
      // getAddressLine() har doim ham bo'lmasligi mumkin, shuning uchun .get('name') va .get('description') ni ham tekshiramiz
      address =
        (typeof firstResult.getAddressLine === 'function' && firstResult.getAddressLine()) ||
        firstResult.get('text') ||
        firstResult.get('name') ||
        firstResult.get('description') ||
        'Manzil topilmadi';
    } else {
      address = 'Manzil aniqlanmadi';
    }

    currentAddress.value = address;
    emit('locationChange', {
      latitude: Number(latitude.toFixed(6)),
      longitude: Number(longitude.toFixed(6)),
      address
    });
  } catch (error) {
    console.error('Error getting address:', error);
    currentAddress.value = 'Manzil olishda xatolik';
    emit('locationChange', {
      latitude: Number(latitude.toFixed(6)),
      longitude: Number(longitude.toFixed(6)),
      address: 'Manzil olishda xatolik'
    });
  }
};

onMounted(() => {
  setTimeout(() => {
    initializeMap();
  }, 500);
});

onUnmounted(() => {
  if (updateTimeout) clearTimeout(updateTimeout);
  if (yandexMap) yandexMap.destroy();
});
</script>

<template>
  <div class="w-full max-w-md mx-auto">

    <div class="bg-white rounded-2xl overflow-hidden">
      <div ref="mapContainer" class="relative w-full h-72 bg-gray-100 flex items-center justify-center">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div class="w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow relative">
            <div
              class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-green-500" />
          </div>
        </div>
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100/90 z-20">
          <div class="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin" />
        </div>
      </div>
      <div class="p-5 bg-white">
        <h2 class="text-2xl font-semibold text-gray-900 mb-5 text-left">{{ title }}</h2>
        <UInput v-model="currentAddress" type="text"
          class="w-full p-4 text-base font-normal text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none transition focus:border-green-500 focus:bg-white placeholder-gray-400"
          :placeholder="addressPlaceholder" />
      </div>
    </div>
  </div>
</template>
