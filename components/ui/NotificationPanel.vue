<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
const { t } = useI18n()

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const open = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});
</script>

<template>
    <USlideover v-model:open="open" title=" " description=" ">
        <template #body>

        </template>
    </USlideover>
</template>
