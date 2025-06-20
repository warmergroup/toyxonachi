<script setup lang="ts">
import { openState } from "~/stores/isOpen.store";

const props = defineProps({
  title: {
    type: String,
  },
  isOpen: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(["close"]);

function closeSlieOver() {
  emit("close");
}

const onClose = () => {
  const openComponent = openState();
  openComponent.onClose();
}
</script>

<template>
  <USlideover :open="isOpen" :title="title" class="bg-[var(--secondary-background-color)]"
    @close="closeSlieOver">
    <template #header>
      <div class="w-full flex items-center justify-between">
        <div class="w-20 h-10 flex items-center justify-start ">
          <Icon name="custom:back" size="16px" @click="onClose" />
        </div>
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <div />
      </div>
    </template>
    <template #body>
      <slot />
    </template>
  </USlideover>
</template>
