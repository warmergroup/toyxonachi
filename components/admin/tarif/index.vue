<script setup lang="ts">


const { t } = useI18n();
const props = defineProps<{
    toyxonaId: number | null;
}>();
const createdTariffId = ref<number | null>(null);

function onTariffCreated(id: number) {
    createdTariffId.value = id;
    // id ni shu yerdan boshqa joyda ishlatishingiz mumkin
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-white rounded-lg flex flex-col gap-3 p-4">
            <AdminTarifNameForm :toyxonaId="props.toyxonaId" @created="onTariffCreated" />
            <AdminTarifPrices :tariffId="createdTariffId" />
            <pre>{{ createdTariffId }}</pre>
        </div>
        <AdminTarifProducts :tariffId="createdTariffId" />

        <UButton class="w-full flex items-center justify-center" color="secondary" label="Saqlash" />
    </div>
</template>
