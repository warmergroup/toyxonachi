<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGetTarifDetailQuery } from '~/data/tariffs'

const props = defineProps<{ tarifId?: number | string }>()

// Tarif detailni olish
const { data: tarifDetail, isLoading, error } = useGetTarifDetailQuery(String(props.tarifId || ''));

// Foydalanuvchiga ko'rsatiladigan label
// console.log('TARIF TYPE DETAIL:', tarifDetail?.value.tariff_types)

// Faqat kerakli turlar
const types = ['meals', 'salads', 'wedding_table', 'bonuses'] as const;
type TypeKey = typeof types[number];
const menuLabels: Record<TypeKey, string> = {
  meals: 'Taomlar',
  salads: 'Salatlar',
  wedding_table: "To'y dasturxoni",
  bonuses: 'Bonuslar'
};

// Kategoriyalarni faqat kerakli turlarga ajratamiz
const categories = computed(() =>
  (tarifDetail.value?.categories || []).filter((cat: any) => types.includes(cat.type))
)

// Tanlangan asosiy tur
const selectedType = ref('meals')

// Tanlangan turga mos kategoriyalar
const filteredCategories = computed(() =>
  categories.value.filter((cat: any) => cat.type === selectedType.value)
)

// Har doim birinchi tur tanlansin
watch(categories, (cats: any[]) => {
  if (cats.length) selectedType.value = types.find((t) => cats.some((c: any) => c.type === t)) || 'meals'
}, { immediate: true })
</script>

<template>
  <div>
    <div v-if="isLoading">Yuklanmoqda...</div>
    <div v-else-if="error">Xatolik: {{ error.message }}</div>
    <div v-else>

      <!-- <div v-if="tarifDetail.value && tarifDetail.value.tariff_types && tarifDetail.value.tariff_types.length">
        <div class="mb-4 p-6 bg-white rounded-2xl">
          <h1 class="font-bold text-2xl mb-4">{{ tarifDetail.value.name }}</h1>
          <div v-for="type in tarifDetail.value.tariff_types" :key="type.id"
            class="flex justify-between items-center mb-2">
            <span class="text-gray-500 text-lg">{{ type.person_count }} kishi</span>
            <span class="font-bold text-2xl">{{ Number(type.price).toLocaleString('ru-RU') }} so'm</span>
          </div>
        </div>
      </div> -->
      <!-- <div v-else>
        <p>Tarif turlari topilmadi</p>
      </div> -->

      <!-- Asosiy filter tugmalari -->
      <div class="flex gap-3 lg:gap-1 overflow-auto whitespace-nowrap mb-2">
        <button v-for="t in types" :key="t" class="px-3 md:px-2 py-2 md:py-1 rounded-md" :class="{
          'bg-[var(--primary-color)] text-white': selectedType === t,
          'bg-white text-gray-700': selectedType !== t
        }" @click="selectedType = t">
          {{ menuLabels[t] }}
        </button>
      </div>

      <!-- Kategoriyalar va mahsulotlar -->
      <div v-if="filteredCategories.length">
        <div v-for="cat in filteredCategories" :key="cat.id" class="mb-6">
          <h3 class="font-bold text-base my-2">{{ cat.name }}</h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="prod in cat.products" :key="prod.id" class="rounded-xl bg-white p-2">
              <NuxtImg :src="prod.image_url" :alt="prod.name"
                class="rounded-lg w-full aspect-square object-cover mb-2" />
              <div class="font-medium text-base">{{ prod.name }}</div>
              <div class="text-muted text-sm">{{ prod.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Kategoriya yoki mahsulotlar yo‘q</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
