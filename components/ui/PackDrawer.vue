<template>
  <UiDrawer v-if="isOpen" @close="isOpen = false">
    <div class="p-6">
      <h2 class="text-2xl font-bold">{{ selectedTariff?.title }}</h2>
      <p class="text-text-secondary mt-2">{{ selectedTariff?.description }}</p>

      <div class="mt-4 space-y-2">
        <h3 class="font-semibold">Narx: {{ selectedTariff?.amount }} {{ selectedTariff?.currency }}</h3>

        <h3 class="font-semibold mt-2">Qo'shimcha:</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(item, index) in selectedTariff?.tabs.foods" :key="index">
            <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-lg"/>
            <p class="text-sm">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </UiDrawer>
</template>

<script setup>
defineProps({
  selectedTariff: Object
});

const isOpen = ref(false);
</script>