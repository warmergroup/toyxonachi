<script setup lang="ts">
    import { ref, reactive, watch, computed } from 'vue';
    import { useCreateToyxona } from '~/data';
    import { useTotxonaFormStore } from '~/stores/toyxonaForm.store';
    import { useLocationStore } from '#imports';

    // Stores
    const coords = useLocationStore().coords;
    const storeImages = useTotxonaFormStore();
    const toast = useToast();
    const emit = defineEmits(['created'])

    interface Tariff {
        id: number;
        name: string;
    }

    interface CreatedEventPayload {
        id: number;
        tariffs: Tariff[];
    }
    // Form state
    const formState = reactive({
        name: '',
        description: '',
        tariff_count: null,
        phone1: '',
        phone2: '',
        telegram: '',
        instagram: '',
    });

    // Location state
    interface LocationData {
        latitude: number;
        longitude: number;
        address: string;
    }
    const selectedLocation = ref<LocationData | null>(null);

    // Handle map change
    const handleLocationChange = (location: LocationData) => {
        selectedLocation.value = location;
    };

    // Normalize phone number
    function normalizePhone(phone: string): string {
        return '+998' + phone.replace(/\D/g, '');
    }

    // Mutation
    const createToyxonaMutation = useCreateToyxona();

    const handleSubmit = async () => {
        if (!selectedLocation.value) {
            toast.add({ title: 'Manzil tanlanmagan!', color: 'warning' });
            return;
        }

        const payload = {
            name: formState.name,
            description: formState.description,
            status: 'review',
            tariff_count: Number(formState.tariff_count),
            phone1: normalizePhone(formState.phone1),
            phone2: normalizePhone(formState.phone2),
            telegram: formState.telegram,
            instagram: formState.instagram,
            latitude: String(selectedLocation.value.latitude),
            longitude: String(selectedLocation.value.longitude),
            address: selectedLocation.value.address,
            wedding_hall_pictures: storeImages.images.map(name => ({
                image_url: name
            }))
        };


        try {
            const result = await createToyxonaMutation.mutateAsync(payload);
            toast.add({ title: 'Toyxona muvaffaqiyatli yaratildi!', color: 'success' });
            emit('created', { id: result.id, tariffs: result.tariffs.map((t: Tariff) => ({ id: t.id, name: t.name })) } as CreatedEventPayload);
            // Reset form (ixtiyoriy)
        } catch (error: any) {
            toast.add({ title: error.message || 'Xatolik yuz berdi', color: 'warning' });
        }

        storeImages.cleareImage()

    };
</script>

<template>
    <div class="flex flex-col gap-4">
        <UiImageUploader />
        <AdminToyxonaForm v-model="formState" />
        <AdminToyxonaYandexMap title="Manzil" address-placeholder="Manzil tanlang..."
            :initial-latitude="coords?.latitude" :initial-longitude="coords?.longitude" :zoom="16"
            @location-change="handleLocationChange" />
        <pre>{{ handleLocationChange }}</pre>
        <UButton class="w-full flex items-center justify-center" color="secondary" label="Saqlash"
            :loading="createToyxonaMutation.isPending.value" @click="handleSubmit" />
    </div>
</template>
