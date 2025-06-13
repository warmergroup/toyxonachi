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
    initMap();
  } else {
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
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

    const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer} = ymaps3;

    const mapElement = document.getElementById('yandex-map');
    if (!mapElement) {
      error.value = 'Xarita elementi topilmadi.';
      return;
    }

    const map = new YMap(mapElement, {
      location: {
        center: [props.center.lng, props.center.lat],
        zoom: 15,
      },
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    // 🔽 SVG marker element yaratish
    const markerElement = document.createElement('div');
    markerElement.innerHTML = `
      <div style="transform: translate(-50%, -100%); width: 12px; height: 12px;" title="${props.title}">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a9.002 9.002 0 0 0-6.366 15.362c1.63 1.63 5.466 3.988 5.693 6.465.034.37.303.673.673.673.37 0 .64-.303.673-.673.227-2.477 4.06-4.831 5.689-6.46A9.002 9.002 0 0 0 12 1z" fill="#F43"></path><path d="M12 13.079a3.079 3.079 0 1 1 0-6.158 3.079 3.079 0 0 1 0 6.158z" fill="#fff"></path></svg>
      </div>
    `;

    const marker = new YMapMarker(
      {
        coordinates: [props.center.lng, props.center.lat],
      },
      markerElement
    );

    map.addChild(marker);
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
