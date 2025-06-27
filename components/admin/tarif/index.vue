<script setup lang="ts">
import { openState } from "~/stores/isOpen.store"

const openComponent = openState()
const router = useRouter()
const { t } = useI18n();
const localePath = useLocalePath();

interface Product {
    id: number
    name: string
    description: string
    image_url: string
    type: string
    category_id?: string | number
}
interface Section {
    label: string
    type: string
    category_id?: number
    form: unknown
    items: Product[]
}

interface ProductsRefExpose {
    sections: Section[]
    reset: () => void
}

const props = defineProps<{
    toyxonaId: number | null;
    tariffCount: number | null;
}>();
const createdTariffId = ref<number | null>(null);

// Modal flag
const showModal = ref(false)
const currentTariffIndex = ref(1)

// Child komponentlarga ref
const nameFormRef = ref()
const pricesRef = ref()
const productsRef = ref<ProductsRefExpose | null>(null)

function onTariffCreated(id: number) {
    createdTariffId.value = id;
}

// Saqlash tugmasi faolligi
const isSaveEnabled = computed(() => {
    const nameValid = nameFormRef.value?.tariffName?.name?.length > 0
    const pricesValid = pricesRef.value?.prices?.length > 0
    const productsValid = productsRef.value?.sections?.some((s: Section) => s.items.length > 0)
    return nameValid && pricesValid && productsValid
})

function resetForms() {
    nameFormRef.value?.reset?.()
    pricesRef.value?.reset?.()
    productsRef.value?.reset?.()
    createdTariffId.value = null
}

function handleSave() {
    if (props.tariffCount && currentTariffIndex.value < props.tariffCount) {
        currentTariffIndex.value += 1
        nextTick(() => {
            resetForms()
        })
    } else {
        showModal.value = true
    }
}

function handleGoProfile() {
    openComponent.onClose()
    const path = localePath('/profile');
    router.push(path);
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-white rounded-lg flex flex-col gap-3 p-4">
            <AdminTarifNameForm ref="nameFormRef" :toyxonaId="props.toyxonaId ?? null" @created="onTariffCreated" />
            <AdminTarifPrices ref="pricesRef" :tariffId="createdTariffId" />
        </div>
        <AdminTarifProducts ref="productsRef" :tariffId="createdTariffId" />

        <UButton class="w-full flex items-center justify-center" color="secondary" label="Saqlash"
            :disabled="!isSaveEnabled" @click="handleSave" />

        <!-- Modal oynasi -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div class="bg-white rounded-2xl p-6 flex flex-col items-center w-[320px]">
                <div class="bg-green-100 rounded-full p-4 mb-4">
                    <Icon name="i-heroicons-check-circle" class="text-green-500" size="48" />
                </div>
                <div class="font-bold text-lg mb-1 text-center">To‘yxona yaratildi</div>
                <div class="text-gray-500 text-center mb-4">Moderatsiya javobini kuting</div>
                <UButton class="w-full" color="primary" label="Asosiy sahifaga qaytish" @click="handleGoProfile" />
            </div>
        </div>
    </div>
</template>
