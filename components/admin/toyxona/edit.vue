<script setup lang="ts">
    import { useUpdateToyxona } from '~/data';
    import { useToyxonaFormStore } from '~/stores/toyxonaForm.store';
    import { openState } from '~/stores/isOpen.store';
    const openComponent = openState();
    const coords = useLocationStore().coords;
    const toast = useToast();
    const emit = defineEmits(['close', 'updated']);

    interface LocationData {
        latitude: number;
        longitude: number;
        address: string;
    }
    const props = defineProps<{ toyxona: any }>();

    // Form state
    const formState = reactive({ ...props.toyxona });

    // Location state
    const selectedLocation = ref({
        latitude: Number(props.toyxona.latitude),
        longitude: Number(props.toyxona.longitude),
        address: props.toyxona.address
    });

    function handleLocationChange(location: LocationData) {
        selectedLocation.value = location;
    }

    // Image store logic
    const toyxonaFormStore = useToyxonaFormStore();
    // On mount or prop change, set images to current toyxona images
    function extractFileName(url: string) {
        try {
            return url.split('/').pop() || url;
        } catch {
            return url;
        }
    }
    function mapPicturesToStore(pictures: any[] = []) {
        return pictures.map((img: any) =>
            img.id
                ? { id: img.id, image_url: extractFileName(img.image_url) }
                : extractFileName(typeof img === 'string' ? img : img.image_url)
        );
    }
    watch(
        [() => props.toyxona, () => openComponent.isOpen, () => openComponent.componentType],
        ([val, isOpen, type]) => {
            if (isOpen && type === 'editToyxona') {
                if (Array.isArray(val.wedding_hall_pictures)) {
                    toyxonaFormStore.setImages(mapPicturesToStore(val.wedding_hall_pictures));
                } else {
                    toyxonaFormStore.setImages([]);
                }
            }
        },
        { immediate: true }
    );

    // Update mutation
    const updateToyxonaMutation = useUpdateToyxona(props.toyxona.id);

    function normalizePhone(phone: string): string {
        return '+998' + String(phone).replace(/\D/g, '');
    }

    const handleSubmit = async () => {
        if (!selectedLocation.value) {
            toast.add({ title: 'Manzil tanlanmagan!', color: 'warning' });
            return;
        }
        const payload = {
            ...formState,
            phone1: normalizePhone(formState.phone1),
            phone2: normalizePhone(formState.phone2),
            latitude: String(selectedLocation.value.latitude),
            longitude: String(selectedLocation.value.longitude),
            address: selectedLocation.value.address,
            wedding_hall_pictures: toyxonaFormStore.images.map((img: any) => {
                if (typeof img === 'object' && img.id) {
                    return { id: img.id, wedding_hall_id: props.toyxona.id, image_url: extractFileName(img.image_url) };
                }
                return { image_url: extractFileName(typeof img === 'string' ? img : img.image_url) };
            })
        };
        try {
            await updateToyxonaMutation.mutateAsync(payload);
            toast.add({ title: 'Toyxona yangilandi!', color: 'success' });
            emit('updated');
            emit('close');
            toyxonaFormStore.cleareImage();
        } catch (error: any) {
            toast.add({ title: error.message || 'Xatolik yuz berdi', color: 'warning' });
        }
    };
</script>

<template>
    <div class="flex flex-col gap-4">
        <UiImageUploader />
        <AdminToyxonaForm v-model="formState" />
        <AdminToyxonaYandexMap :initial-latitude="selectedLocation.latitude"
            :initial-longitude="selectedLocation.longitude" :zoom="16" @location-change="handleLocationChange" />
        <UButton class="w-full flex items-center justify-center" color="secondary" label="Saqlash"
            :loading="updateToyxonaMutation.isPending.value" @click="handleSubmit" />
    </div>
</template>