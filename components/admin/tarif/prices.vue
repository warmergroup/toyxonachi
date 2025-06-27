<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useCreateTariffType } from '~/data'
import { vMaska } from 'maska/vue'

const { t } = useI18n()
const props = defineProps<{ tariffId: number | null }>()

// Form state
const state = reactive({
    person_count: '',
    price: ''
})

// Tariflar ro'yxati
const prices = ref<Array<{
    id: number
    tariff_id: string
    person_count: string
    price: string
    created_at: string
    updated_at: string
}>>([])

const { mutate: createTariffType, isPending: isCreating } = useCreateTariffType()

function addPrice() {
    if (!state.person_count || !state.price || !props.tariffId) return

    createTariffType(
        {
            tariff_id: props.tariffId,
            person_count: Number(state.person_count),
            price: Number(state.price.replace(/\s/g, ''))
        },
        {
            onSuccess(data) {
                // API dan massiv qaytsa, to‘liq o‘rnating
                if (Array.isArray(data)) {
                    prices.value = data
                } else if (data) {
                    prices.value.unshift(data)
                }
                state.person_count = ''
                state.price = ''
            }
        }
    )
}

function removePrice(id: number) {
    prices.value = prices.value.filter(item => item.id !== id)
}

// Agar parentdan tarifId o'zgarsa, eski narxlarni tozalash (optional)
watch(() => props.tariffId, () => {
    prices.value = []
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <p class="py-2 flex items-center justify-between font-semibold">
            {{ t('tariffForm.tariffPrice') }}
            <button @click="addPrice" class="text-xl px-2 py-1 rounded hover:bg-gray-100 transition"
                :disabled="isCreating">
                <span v-if="isCreating">
                    <Icon name="i-heroicons-arrow-path-20-solid" class="animate-spin" />
                </span>
                <span v-else>+</span>
            </button>
        </p>
        <!-- Inputlar -->
        <UForm :state="state" class="w-full flex items-center justify-between gap-2" @submit.prevent="addPrice">
            <UFormField class="w-1/4" :label="t('Kishi')" name="person_count">
                <UInput v-model="state.person_count" v-maska="'####'" color="secondary" variant="soft" class="w-full"
                    type="text" size="xl" :placeholder="t('Kishi')" :disabled="isCreating" />
            </UFormField>
            <UFormField class="w-3/4" :label="t('Summasi')" name="price">
                <UInput v-model="state.price" v-maska="'### ### ###'" color="secondary" variant="soft" class="w-full"
                    type="text" size="xl" :placeholder="t('tariffForm.price')" :disabled="isCreating" />
            </UFormField>
        </UForm>
        <!-- Tariflar ro'yxati -->
        <div v-for="item in prices" :key="item.id" class="w-full flex items-center justify-between gap-2">
            <div class="w-1/4 bg-gray-100 rounded-lg p-1">
                <p class="text-xs text-gray-400">{{ t('Kishi') }}</p>
                <span class="font-semibold">{{ item.person_count }}</span>
            </div>
            <div class="w-3/4 flex items-center justify-between ">
                <div class="bg-gray-100 rounded-lg p-1 w-full">
                    <p class="text-xs text-gray-400">{{ t('Summasi') }}</p>
                    <span class="font-semibold">{{ item.price }}</span>
                </div>
                <button @click="removePrice(item.id)" class="ml-2 text-red-500 hover:text-red-700">
                    <Icon name="custom:trash-icon" />
                </button>
            </div>
        </div>
    </div>
</template>