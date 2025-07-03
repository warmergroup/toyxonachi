<script setup lang="ts">

    import { useDeleteTariff, useUpdateTariffName } from '~/data'


    const { t } = useI18n()
    const props = defineProps<{
        toyxonaId: number | null
        tariffId: number | null
        defaultName: string
    }>()
    const emit = defineEmits<{
        (e: 'created', id: number): void
    }>()

    // Tarif nomini local state sifatida har safar yangi obyekt qilib olamiz
    const tariffName = reactive({
        name: props.defaultName || ''
    })

    watch(
        () => props.defaultName,
        (val) => {
            // Obyektni to'liq yangilash
            tariffName.name = val || ''
        },
        { immediate: true }
    )

    // Faqat update va delete funksiyalari ishlatiladi
    const { mutate: updateTariff, isPending: isUpdating } = useUpdateTariffName(props.tariffId ?? 0)

    function handleUpdate() {
        if (!tariffName.name || !props.toyxonaId || !props.tariffId) return
        updateTariff(
            { name: tariffName.name, wedding_hall_id: props.toyxonaId },
            {
                onSuccess(data) {
                    tariffName.name = data.name
                }
            }
        )
    }

    function reset() {
        // Propdan sync qilish (keyingi tarifga o'tganda to'g'ri nom chiqishi uchun)
        tariffName.name = props.defaultName || ''
    }
    defineExpose({ tariffName, reset })
</script>

<template>
    <UForm :state="tariffName" class="w-full flex flex-col gap-4" @submit.prevent="handleUpdate">
        <UFormField class="w-full" :label="t('tariffForm.tariffName')" name="name">
            <UInput v-model="tariffName.name" variant="soft" class="w-full" type="text" size="xl"
                :placeholder="t('tariffForm.tariffName')" :loading="isUpdating">
                <template v-if="tariffName.name?.length" #trailing>
                    <UButton color="neutral" variant="soft" size="xl" icon="material-symbols:check"
                        @click="handleUpdate" :loading="isUpdating" />
                </template>
            </UInput>
        </UFormField>
    </UForm>
</template>