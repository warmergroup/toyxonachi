<script setup lang="ts">
import { useCreateToyxona } from '~/data';
import { useTotxonaFormStore } from '~/stores/toyxonaForm.store';
import { useLocationStore } from '#imports';

const coords = useLocationStore().coords
const formState = reactive({
    name: '',
    description: '',
    tariff_count: null,
    phone1: '',
    phone2: '',
    telegram: '',
    instagram: '',
});
const storeImages = useTotxonaFormStore()
interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
}
const selectedLocation = ref<LocationData | null>(null);

const handleLocationChange = (location: LocationData) => {
    selectedLocation.value = location;
};
function normalizePhone(phone: string) {
    // Faqat raqamlarni olib, prefix qo‘shadi
    return '+998' + phone.replace(/\D/g, '');
}
const payload = {
    ...formState,
    phone1: normalizePhone(formState.phone1),
    phone2: normalizePhone(formState.phone2),

    // boshqa maydonlar...
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <UiImageUploader />
        <AdminToyxonaForm v-model="formState" />
        <AdminToyxonaYandexMap title="Manzil" address-placeholder="Manzil tanlang..."
            :initial-latitude="coords?.latitude" :initial-longitude="coords?.longitude" :zoom="16"
            @location-change="handleLocationChange" />
        <pre>{{ selectedLocation }}</pre>
        <UButton class="w-full flex items-center justify-center" color="secondary" label="saqlash" />
    </div>

</template>