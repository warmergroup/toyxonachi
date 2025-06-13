<script setup>
import {onMounted, ref} from 'vue';
import {useRuntimeConfig} from '#app';

const props = defineProps({
  center: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    default: 'Toʻyxona joylashuvi',
  },
});

const config = useRuntimeConfig();
const apiKey = config.public.yandexMapsApiKey;

const error = ref(null);

onMounted(() => {
  if (typeof ymaps3 !== 'undefined') {
    // console.log('Yandex Maps API 3.0 already loaded.');
    initMap();
  } else {
    // console.log('Loading Yandex Maps API 3.0...');
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // console.log('Yandex Maps API 3.0 loaded successfully.');
      initMap();
    };

    script.onerror = () => {
      error.value = 'Xarita yuklanmadi. Iltimos, API kalitni tekshiring.';
    };

    document.head.appendChild(script);
  }
});

async function initMap() {
  try {
    await ymaps3.ready;
    // console.log('Yandex Maps API 3.0 is ready.');

    const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer} = ymaps3;

    const mapElement = document.getElementById('yandex-map');
    if (!mapElement) {
      error.value = 'Xarita elementi topilmadi.';
      return;
    }

    const map = new YMap(mapElement, {
      location: {
        center: [props.center.lat, props.center.lng],
        zoom: 16,
      },
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const marker = new YMapMarker({
      coordinates: [props.center.lng, props.center.lat],
      title: props.title,
    });

    map.addChild(marker);

    // console.log('Map and marker initialized successfully.');
  } catch (e) {
    error.value = 'Xarita ishga tushmadi.';
    console.error(e);
  }
}
</script>

<template>
  <div>
    <div v-if="error" class="text-red-500 border border-red-400 bg-red-50 p-2 rounded">
      {{ error }}
    </div>
    <div v-else id="yandex-map" class="w-full aspect-square"/>
  </div>
</template>

<style>
#yandex-map {
  width: 100%;
  height: 100%;
}
</style>
