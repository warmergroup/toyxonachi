<script setup lang="ts">
definePageMeta({
    middleware: ['admin-or-superadmin']
})
import type { ITarif, IToyxonalar } from '~/interfaces';
import { useLocationStore } from '~/stores/location.store';
import { getDistanceFromLatLonInKm } from '~/utils/distance'
import { useGetTariflarQuery } from "~/data/tariffs";
import { getToyxonaById } from '~/data/toyxonalar';
import type { UseQueryReturnType } from '@tanstack/vue-query';
import { openState } from '~/stores/isOpen.store';
import { useChangeToyxonaStatus } from '~/data'

const openComponent = openState();
const authStore = useAuthStore()
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const { isLargeScreen } = useScreenSize();
const locationStore = useLocationStore()
const changeStatus = useChangeToyxonaStatus()
const { data: toyxona } = getToyxonaById(route.params.id as string) as UseQueryReturnType<IToyxonalar, Error>;
const { data: tariflar } = useGetTariflarQuery(route.params.id as string) as UseQueryReturnType<ITarif, Error>;
const error = ref<string | null>(null);
const selectedTarif = ref<any | null>(null);
const isRejectDrawerOpen = ref(false)
const toast = useToast()

const goback = () => {
    router.go(-1);
};
const onClose = () => {
    openComponent.onClose();
}
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

const imagelItems = computed(() =>
    (toyxona?.value?.wedding_hall_pictures as any[] || []).map(b => ({
        src: b.image_url,
        id: b.id,
        wedding_hall_id: b.wedding_hall_id
    }))
)


const tariflarForCard = computed(() =>
    Array.isArray(toyxona.value?.tariffs)
        ? toyxona.value.tariffs.map((tarif: any) => ({
            ...tarif,
            tariff_types: tarif.tariff_types || []
        }))
        : []
);

const openTarifSlide = (tarif: any) => {
    selectedTarif.value = tarif;
    openComponent.onOpen('showTariff');
};


function handleAccept() {
    if (!toyxona.value) return
    changeStatus.mutate({
        wedding_hall_id: toyxona.value.id,
        status: 'active',
        reject_reason: ''
    }, {
        onSuccess: () => {
            toast.add({
                description: 'Toyxona qabul qilindi',
                color: 'success',
            })
        },
        onError: (err) => {
            toast.add({
                description: (err.message || 'Xatolik yuz berdi'),
                color: 'error',
            })
        }
    })
}

function handleReject(reason: string) {
    if (!toyxona.value) return
    changeStatus.mutate({
        wedding_hall_id: toyxona.value.id,
        status: 'rejected',
        reject_reason: reason
    }, {
        onSuccess: () => {
            toast.add({
                description: 'Rad etish xabari yuborildi',
                color: 'success',
            }),
                isRejectDrawerOpen.value = false
        },
        onError: (err) => {
            toast.add({
                description: (err.message || 'Xatolik yuz berdi'),
                color: 'error',
            })
        }
    })
}

</script>

<template>
    <div v-if="error" class="flex items-center justify-center h-64">
        <p class="text-text-secondary">{{ error }}</p>
    </div>
    <div v-else-if="toyxona" class="mb-25 lg:p-5 lg:py-20 w-full h-full">
        <SuperadminAcceptReject @reject="isRejectDrawerOpen = true" @accept="handleAccept" />
        
        <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
            <!-- Chap ustun (2/3) -->
            <div class="flex flex-col lg:gap-4 lg:col-span-2 lg:rounded-lg w-full h-full bg-white">
                <template v-if="isLargeScreen">
                    <UiThumbnailGallery class="px-3 pt-3" :toyxona="toyxona" />
                </template>

                <div v-if="!isLargeScreen" ref="imageRef" class="sticky top-0 w-full h-auto">
                    <div class="relative">
                        <UiCarousel
                            v-if="toyxona && Array.isArray(toyxona.wedding_hall_pictures) && toyxona.wedding_hall_pictures.length > 1"
                            :items="imagelItems" :rounded="false" :arrows="false" />
                        <NuxtImg v-else-if="toyxona && toyxona.wedding_hall_pictures.length > 0"
                            :src="toyxona.wedding_hall_pictures[0].image_url" :alt="toyxona.name"
                            class="w-full aspect-video object-cover" />
                        <div
                            class="absolute w-full h-full top-0 left-0 p-3 inset-0 pointer-events-none bg-gradient-to-b from-black to-transparent opacity-30">
                            <div class="flex items-center justify-between pointer-events-auto">
                                <span
                                    class="z-10 w-[36px] h-[36px] backdrop-blur-md bg-white/50 rounded-full p-2 cursor-pointer flex items-center justify-center border border-white"
                                    @click="goback()">
                                    <Icon class="text-white" name="custom:arrow-back" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-3 p-3 z-10 bg-white rounded-t-2xl">
                    <div>
                        <h1 class="font-bold text-2xl">{{ toyxona.name }}</h1>
                        <p class="font-medium text-sm">{{ toyxona.address }}</p>
                        <p v-if="userDistance" class="text-text-secondary">
                            {{ userDistance.toFixed(1) }} km {{ t('common.fromYou') }}
                        </p>
                    </div>

                    <!-- Tariffs -->
                    <h2 class="font-medium text-lg text-text-primary">{{ t('venue.tariffs') }}</h2>
                    <UiTarifCard v-for="tarif in tariflarForCard" :key="tarif.id" :tarif="tarif"
                        @click="openTarifSlide(tarif)" />

                    <div>
                        <h2 class="font-medium text-lg">{{ t('venue.description') }}</h2>
                        <span>{{ toyxona.description }}
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
                        <YandexMap :center="{ lat: Number(toyxona.latitude), lng: Number(toyxona.longitude) }"
                            :title="toyxona.name" class="w-full h-48 md:h-64 lg:h-80" />
                        <!-- {{ toyxona.latitude }}, {{ toyxona.longitude }} -->
                    </div>
                    <div class="flex items-center text-text-secondary mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-primary" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
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

        <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'showTariff'"
            :title="selectedTarif?.name || 'tarif'" @close="onClose">
            <UiTarifTabs :tarif-id="selectedTarif?.id" />
        </UiSlideOver>

        <UiDrawer v-if="!isLargeScreen" :isOpen="isRejectDrawerOpen" title="Rad etish sababi"
            @close="isRejectDrawerOpen = false">
            <SuperadminRejectForm @submit="handleReject" />
        </UiDrawer>

        <UiSlideOver v-if="isLargeScreen" :isOpen="isRejectDrawerOpen" title="Rad etish sababi"
            @close="isRejectDrawerOpen = false">
            <SuperadminRejectForm @submit="handleReject" />
        </UiSlideOver>
    </div>

    <div v-else class=" mx-auto mt-50vh flex items-center justify-center h-64">
        <p class="text-text-secondary">{{ t('common.loading') }}</p>
    </div>

</template>