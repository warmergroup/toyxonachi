<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ITarif } from '~/interfaces';

const { t } = useI18n();
const props = defineProps<{
  tarif: ITarif,
  onOpenDrawer?: (tarif: ITarif) => void
}>();
const emit = defineEmits(['openDrawer']);

const openDrawer = () => {
  emit('openDrawer', props.tarif);
};
</script>

<template>
  <div
    class="flex justify-between items-center mb-2 p-3 rounded-lg bg-[var(--secondary-background-color)] cursor-pointer"
    @click="openDrawer">
    <div>
      <div class="font-semibold">tarif nomi</div>
      <div class="text-sm text-gray-500">{{ tarif.people_count }} {{ t('venue.people') }}
        {{ tarif.total_price }} so'm
      </div>
    </div>
    <UIcon name="custom:chevron-right" />
  </div>
</template>
