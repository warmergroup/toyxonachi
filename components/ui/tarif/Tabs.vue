<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ foods?: string }>()

// Mock data for testing
const mockFoods = JSON.stringify([
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Palov', image: '/logo-splash.svg', price: '25000', category: 'Taom' },
    { name: 'Olivye salat', image: '/logo-splash.svg', price: '15000', category: 'Salat' },
    { name: 'Shashlik', image: '/logo-splash.svg', price: '30000', category: 'Taom' },
    { name: 'Mastava', image: '/logo-splash.svg', price: '20000', category: 'Sho‘rva' },
    { name: 'Somsa', image: '/logo-splash.svg', price: '10000', category: 'Shirinlik' },
    { name: 'Kofe', image: '/logo-splash.svg', price: '7000', category: 'Ichimlik' },
    { name: 'Salat', image: '/logo-splash.svg', price: '12000', category: 'Salat' },
    { name: 'Manti', image: '/logo-splash.svg', price: '18000', category: 'Salat' },
    { name: 'Chuchvara', image: '/logo-splash.svg', price: '16000', category: 'Taom' },
    { name: 'Kebab', image: '/logo-splash.svg', price: '35000', category: 'Taom' },
    { name: 'Tuxum', image: '/logo-splash.svg', price: '8000', category: 'Non' },
    { name: 'Baliq', image: '/logo-splash.svg', price: '40000', category: 'Taom' },
    { name: 'Pirog', image: '/logo-splash.svg', price: '12000', category: 'Non' },
    { name: 'Qaymoq', image: '/logo-splash.svg', price: '6000', category: 'Ichimlik' }
])

// Use mock data if foods prop is not provided
const foodsArr = computed<any[]>(() => {
    try {
        return JSON.parse(props.foods || mockFoods) as any[]
    } catch {
        return []
    }
})

// Get unique categories
const categories = computed((): string[] => {
    const cats = foodsArr.value.map((f) => String(f.category))
    return [...new Set(cats)]
})

// Foods by category
function foodsByCategory(category: string) {
    return foodsArr.value.filter((f) => f.category === category)
}

const tabItems = computed(() =>
    categories.value.map((cat) => ({
        label: cat,
        slot: cat
    }))
)

const selectedTab = ref(categories.value[0]) // Default tab

function selectTab(category: string) {
    selectedTab.value = category
}
</script>

<template>
    <div class="">
        <!-- Tab buttons -->
        <div class="flex gap-3 overflow-auto whitespace-nowrap">
            <button v-for="category in categories" :key="category" @click="selectTab(category)"
                class="px-3 py-2 rounded-md" :class="{
                    'bg-[var(--primary-color)] text-white': selectedTab === category,
                    'bg-white text-gray-700': selectedTab !== category
                }">
                {{ category }}
            </button>
        </div>

        <!-- Tab content -->
        <div class="h-[60vh] overflow-auto">
            <h3 class="font-semibold text-lg my-2">
                {{ foodsByCategory(selectedTab).length }} {{ selectedTab.toLowerCase() }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div v-for="food in foodsByCategory(selectedTab)" :key="food.name" class="rounded-xl bg-white p-2">
                    <NuxtImg :src="food.image" :alt="food.name"
                        class="rounded-lg w-full aspect-square object-cover mb-2" />
                    <div class="absolute bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div class="font-semibold text-base">{{ food.name }}</div>
                    <div class="text-muted text-sm">{{ food.price }} so'm</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 3px;
    height: 3px;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>
