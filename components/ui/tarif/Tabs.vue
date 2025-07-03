<script setup lang="ts">

  import { useGetTarifDetailQuery } from '~/data/tariffs'

  const props = defineProps<{ tarifId?: number | string }>()

  const { data: tarifDetail, isLoading, error } = useGetTarifDetailQuery(String(props.tarifId || ''))

  interface TariffType {
    id: number
    person_count: number
    price: number | string
  }
  interface Product {
    id: number
    name: string
    description: string
    image_url: string
    type: string
    category_id?: string | number
  }
  interface TariffDetail {
    name: string
    tariff_types: TariffType[]
    tariff_products: Product[]
  }
  interface Tab {
    label: string
    keys: readonly string[]
  }
  interface Section {
    label: string
    items: Product[]
  }

  // Tablar va bo‘limlar
  const tabs: readonly Tab[] = [
    { label: 'Taomlar', keys: ['meals'] },
    { label: 'Salatlar', keys: ['salads'] },
    { label: "To'y dasturxoni", keys: ['wedding_table'] },
    { label: 'Bonuslar', keys: ['bonuses'] }
  ] as const

  const activeTab: Ref<string> = ref(tabs[0].label)

  // Ajratilgan bo'limlar uchun computed
  const mealsSections: ComputedRef<Section[]> = computed(() => {
    const products: Product[] = (tarifDetail.value?.tariff_products || []).filter((p: Product) => p.type === 'meals')
    return [
      {
        label: '1-taom',
        items: products.filter((p: Product) => String(p.category_id) === '1')
      },
      {
        label: '2-taom',
        items: products.filter((p: Product) => String(p.category_id) === '2')
      }
    ]
  })
  const weddingSections: ComputedRef<Section[]> = computed(() => {
    const products: Product[] = (tarifDetail.value?.tariff_products || []).filter((p: Product) => p.type === 'wedding_table')
    return [
      {
        label: "To'y dasturxoni",
        items: products.filter((p: Product) => String(p.category_id) === '1')
      },
      {
        label: "Qo'shimcha noz ne'matlar",
        items: products.filter((p: Product) => String(p.category_id) === '2')
      }
    ]
  })
  const saladsSection: ComputedRef<Section[]> = computed(() => [
    {
      label: 'Salatlar',
      items: (tarifDetail.value?.tariff_products || []).filter((p: Product) => p.type === 'salads')
    }
  ])
  const bonusesSection: ComputedRef<Section[]> = computed(() => [
    {
      label: 'Bonuslar',
      items: (tarifDetail.value?.tariff_products || []).filter((p: Product) => p.type === 'bonuses')
    }
  ])

  const tabSections: ComputedRef<Section[]> = computed(() => {
    if (activeTab.value === 'Taomlar') return mealsSections.value
    if (activeTab.value === "To'y dasturxoni") return weddingSections.value
    if (activeTab.value === 'Salatlar') return saladsSection.value
    if (activeTab.value === 'Bonuslar') return bonusesSection.value
    return []
  })

  // Tabni avtomatik birinchi mavjud bo‘limga o‘zgartirish (ma’lumot kelganda)
  watch(
    () => tarifDetail.value?.tariff_products,
    (products: Product[]) => {
      if (products?.length) {
        const firstType = tabs.find((tab: Tab) => products.some((p: Product) => tab.keys.includes(p.type)))
        if (firstType) activeTab.value = firstType.label
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    <div v-if="isLoading">Yuklanmoqda...</div>
    <div v-else-if="error">Xatolik: {{ error.message }}</div>
    <div v-else class="flex flex-col gap-2">

      <div v-if="tarifDetail && tarifDetail.tariff_types && tarifDetail.tariff_types.length">
        <div class="p-2 bg-white rounded-lg flex flex-col gap-2">
          <h1 class="font-bold text-xl">{{ tarifDetail.name }}</h1>
          <div v-for="type in tarifDetail.tariff_types" :key="type.id" class="flex justify-between items-center">
            <span class="text-gray-500 text-xs md:text-sm">{{ type.person_count }} kishi</span>
            <span class="font-bold text-sm">{{ Number(type.price).toLocaleString('ru-RU') }} so'm</span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-3 lg:gap-1 overflow-auto whitespace-nowrap mb-2 hide-scrollbar min-h-[44px]">
        <button v-for="tab in tabs" :key="tab.label"
          class="px-3 md:px-2 py-2 md:py-1 rounded-xl font-medium whitespace-nowrap transition"
          :class="activeTab === tab.label ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'" style="flex-shrink: 0;"
          @click="activeTab = tab.label">
          {{ tab.label }}
        </button>
      </div>

      <!-- Bo'limlar va mahsulotlar -->
      <div v-if="tabSections.length">
        <div v-for="section in tabSections" :key="section.label">
          <h3 class="font-bold text-base my-2">{{ section.label }}</h3>
          <div v-if="section.items.length" class="grid grid-cols-2 gap-3">
            <div v-for="prod in section.items" :key="prod.id" class="rounded-xl bg-white p-2">
              <NuxtImg :src="prod.image_url" :alt="prod.name"
                class="rounded-lg w-full aspect-square object-cover mb-2" />
              <div class="font-medium text-base">{{ prod.name }}</div>
              <div class="text-muted text-sm">{{ prod.description }}</div>
            </div>
          </div>
          <div v-else class="text-gray-400 text-sm">Mahsulotlar yo‘q</div>
        </div>
      </div>
      <div v-else>
        <p>Kategoriya yoki mahsulotlar yo‘q</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>