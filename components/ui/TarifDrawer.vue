<script setup lang="ts">
const props = defineProps({
  open: Boolean,
  tarif: Object
});
const emit = defineEmits(['update:open', 'close']);

function closeDrawer() {
  emit('update:open', false);
  emit('close');
}
</script>

<template>
  <UDrawer :open="props.open" @close="closeDrawer" :class="['mx-auto w-full', props.tarif ? 'h-[100vh]' : 'h-[10vh]']">
    <template #content>
      <div class="m-4 md:p-5 lg:p-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-highlighted font-semibold">{{ props.tarif?.name || 'Tarif' }}</h2>
          <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="closeDrawer" />
        </div>
        <div v-if="!props.tarif">
          <!-- <div class="mb-2">{{ props.tarif.people_count }} kishi</div>
          <div class="mb-2">{{ props.tarif.total_price }} so'm</div> -->
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa ut dicta modi, ipsum non similique officiis
            et totam natus voluptates voluptatem obcaecati itaque exercitationem! Quibusdam enim earum ipsum impedit
            corrupti, provident unde ducimus et dolor at quo dicta pariatur itaque aspernatur ipsam tempora quam ad
            delectus ratione? Soluta, voluptates commodi itaque, optio temporibus doloribus explicabo provident,
            architecto impedit ut ipsa. Eius, nulla illo quas labore quae adipisci consequatur sed quidem libero. Ex,
            deserunt voluptatem quasi tempore, recusandae, placeat distinctio sunt tenetur atque aperiam delectus
            eligendi iste alias natus odit cupiditate sint! Officia labore consequuntur enim, exercitationem neque
            aliquid quod minus!</p>
        </div>
        <div v-else>
          <span class="text-gray-400">Tarif ma'lumotlari topilmadi</span>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
