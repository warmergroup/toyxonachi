<script setup lang="ts">

import { useDeleteTariff, useCreateTarif } from '~/data'

const { t } = useI18n()
const props = defineProps<{
    toyxonaId: number | null
}>()
const emit = defineEmits<{
    (e: 'created', id: number): void
}>()

const tariffName = reactive({
    name: ''
})

const createdTariff = ref<null | {
    name: string
    wedding_hall_id: number
    updated_at: string
    created_at: string
    id: number
}>(null)

const { mutate: createTariff, isPending: isCreating } = useCreateTarif()
const { mutate: deleteTariff, isPending: isDeleting } = useDeleteTariff()

function handleCreate() {
    if (!tariffName.name || !props.toyxonaId) return
    createTariff(
        {
            name: tariffName.name,
            wedding_hall_id: props.toyxonaId
        },
        {
            onSuccess(data) {
                createdTariff.value = data
                emit('created', data.id)
            }
        }
    )
}

function handleRemove() {
    if (!createdTariff.value) return
    deleteTariff(
        createdTariff.value.id,
        {
            onSuccess() {
                createdTariff.value = null
                tariffName.name = ''
                emit('created', 0)
            }
        }
    )
}
</script>

<template>
    <UForm :state="tariffName" class="w-full flex flex-col gap-4" @submit.prevent="handleCreate">
        <template v-if="!createdTariff">
            <UFormField class="w-full" :label="t('toyxonaForm.nameField')" name="name">
                <UInput v-model="tariffName.name" color="secondary" variant="soft" class="w-full" type="text" size="xl"
                    :placeholder="t('toyxonaForm.nameField')" :loading="isCreating">
                    <template v-if="tariffName.name?.length" #trailing>
                        <UButton color="neutral" size="xl" icon="material-symbols:check" @click="handleCreate"
                            :loading="isCreating" />
                    </template>
                </UInput>
            </UFormField>
        </template>
        <template v-else>
            <div class="flex items-center gap-2">
                <span class="font-semibold text-lg">{{ createdTariff.name }}</span>
                <UButton icon="i-heroicons-x-mark" color="warning" size="sm" variant="soft" @click="handleRemove"
                    :loading="isDeleting" />
            </div>
        </template>
    </UForm>
</template>