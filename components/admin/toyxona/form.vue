<script setup lang="ts">
import { vMaska } from 'maska/vue';

const { t } = useI18n();
const phonePrefix = '+998';
const state = reactive({
    name: '',
    description: '',
    tariff_count: null,
    phone1: '',
    phone2: '',
    telegram: '',
    instagram: '',
});


</script>

<template>
    <div class="p-4 flex flex-col items-center justify-center bg-white rounded-xl">
        <UForm :state="state" class="w-full flex flex-col gap-4">

            <UFormField class="w-full" :label="t('toyxonaForm.nameField')" name="name">
                <UInput v-model="state.name" class="w-full" type="text" size="xl"
                    :placeholder="t('toyxonaForm.nameField')" color="secondary" />
            </UFormField>
            <UFormField class="w-full" :label="t('toyxonaForm.tariffsField')" name="tariff_count">
                <UInput v-model="state.tariff_count" class="w-full" type="number" size="xl"
                    :placeholder="t('toyxonaForm.tariffsField')" color="secondary" />
            </UFormField>
            <UFormField class="w-full" :label="t('toyxonaForm.phone1Field')" name="phone1">
                <UInput icon="custom:prefix-number" v-model="state.phone1" v-maska="'## ### ## ##'" class="pl-20 w-full"
                    size="xl" type="text" placeholder="90 123 45 67" color="secondary" />
            </UFormField>
            <UFormField class="w-full" :label="t('toyxonaForm.phone2Field')" name="phone2">
                <UInput icon="custom:prefix-number" v-model="state.phone2" v-maska="'## ### ## ##'" class="pl-20 w-full"
                    size="xl" color="secondary" type="text" placeholder="90 123 45 67" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.telegramField')" name="telegram">
                <UInput v-model="state.telegram" class="w-full" type="text" size="xl" placeholder="t.me/"
                    color="secondary" />
            </UFormField>
            <UFormField class="w-full" :label="t('toyxonaForm.instagramField')" name="instagram">
                <UInput v-model="state.instagram" class="w-full" type="text" size="xl" placeholder="www.instagram.com/"
                    color="secondary" />
            </UFormField>
        </UForm>
    </div>
</template>