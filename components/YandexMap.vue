<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const config = useRuntimeConfig();
const apiKey = config.public.yandexMapsApiKey;
const mapContainer = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);
let yandexMap: any = null;
const languageStore = useLanguageStore();
const langCode = getYandexLangCode(languageStore.getLang());

const props = defineProps({
  center: {
    type: Object as () => { lat: number; lng: number },
    required: true,
  },
  title: {
    type: String,
    default: 'Toʻyxona joylashuvi',
  },
});


function getYandexLangCode(lang: string) {
  if (lang === 'ru') return 'ru_RU';
  if (lang === 'en') return 'en_US';
  if (lang === 'uz') return 'uz_UZ';
  return 'ru_RU'; // default
}


function loadYandexMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolve();
      return;
    }
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
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=${langCode}`;
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
      center: [props.center.lat, props.center.lng],
      zoom: 15,
      controls: ['zoomControl', 'typeSelector'],
    });

    const placemark = new window.ymaps.Placemark(
      [props.center.lat, props.center.lng],
      {
        hintContent: props.title,
        balloonContent: props.title,
      },
      {
        preset: 'islands#greenDotIcon',
        iconColor: '#22c55e',
      }
    );

    yandexMap.geoObjects.add(placemark);
  } catch (err) {
    console.error('Xarita ishga tushmadi', err);
    error.value = 'Xarita yuklanmadi';
  }
};

onMounted(() => {
  setTimeout(() => {
    initializeMap();
  }, 300);
});

onUnmounted(() => {
  if (yandexMap) yandexMap.destroy();
});
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div ref="mapContainer" class="relative w-full h-80 bg-gray-100 flex items-center justify-center">
        <div v-if="error" class="absolute inset-0 flex items-center justify-center bg-white/80 z-10 text-red-600">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
