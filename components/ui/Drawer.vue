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
<template>
    <UDrawer :open="isOpen" :title="title" >
        <template #body>
            <slot />
        </template>
    </UDrawer>
</template>
