<template>
    <UDrawer :open="isOpen" :title="title" @close="closeDrawer">
        <template #body>
            <slot />
        </template>
    </UDrawer>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    }
});

const emit = defineEmits(["close"]);

function closeDrawer() {
    emit("close");
}
</script>
