<script setup lang="ts">
import { vMaska } from 'maska/vue';

const { t } = useI18n();

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:modelValue']);

// Two-way binding with parent via computed
const state = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
});
</script>

<template>
    <div class="p-4 flex flex-col items-center justify-center bg-white rounded-xl">
        <UForm :state="state" class="w-full flex flex-col gap-4">
            <UFormField class="w-full" :label="t('toyxonaForm.nameField')" name="name">
                <UInput v-model="state.name" type="text" size="xl" :placeholder="t('toyxonaForm.nameField')"
                    color="secondary" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.tariffsField')" name="tariff_count">
                <UInput v-model="state.tariff_count" v-maska="'#'" type="text" size="xl"
                    :placeholder="t('toyxonaForm.tariffsField')" color="secondary" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.phone1Field')" name="phone1">
                <UInput icon="custom:prefix-number" v-model="state.phone1" v-maska="'## ### ## ##'" class="pl-20"
                    size="xl" type="text" placeholder="90 123 45 67" color="secondary" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.phone2Field')" name="phone2">
                <UInput icon="custom:prefix-number" v-model="state.phone2" v-maska="'## ### ## ##'" class="pl-20"
                    size="xl" type="text" placeholder="90 123 45 67" color="secondary" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.telegramField')" name="telegram">
                <UInput v-model="state.telegram" type="text" size="xl" placeholder="t.me/..." color="secondary" />
            </UFormField>

            <UFormField class="w-full" :label="t('toyxonaForm.instagramField')" name="instagram">
                <UInput v-model="state.instagram" type="text" size="xl" placeholder="www.instagram.com/..."
                    color="secondary" />
            </UFormField>
        </UForm>
    </div>
</template>
