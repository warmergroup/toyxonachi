<script setup lang="ts">

import { useCreateTariffProduct, useUploadImage } from '~/data'
import { useTotxonaFormStore } from '~/stores/toyxonaForm.store'
const config = useRuntimeConfig()
const imageUrl = config.public.imageUrl

interface Product {
    id: number
    tariff_id: string
    type: string
    name: string
    description: string
    image_url: string
    category_id?: string
    created_at: string
    updated_at: string
}

interface FormState {
    name: string
    description: string
    image_url: string
    imageUploading: boolean
}

interface Section {
    form: FormState
    items: Product[]
    type: string
    category_id?: number
}

interface Tab {
    label: string
    key: string
}

const props = defineProps<{ tariffId: number | null }>()

const tabs: Tab[] = [
    { label: 'Taomlar', key: 'taomlar' },
    { label: 'Salatlar', key: 'salatlar' },
    { label: "To'y dasturxoni", key: 'dasturxon' },
    { label: 'Bonuslar', key: 'bonus' }
]

const activeTab = ref<string>('taomlar')

const taomlar = reactive<Record<string, Section>>({
    '1-taom': {
        form: { name: '', description: '', image_url: '', imageUploading: false },
        items: [],
        type: 'meals',
        category_id: 1
    },
    '2-taom': {
        form: { name: '', description: '', image_url: '', imageUploading: false },
        items: [],
        type: 'meals',
        category_id: 2
    }
})

const salatlar = reactive<Section>({
    form: { name: '', description: '', image_url: '', imageUploading: false },
    items: [],
    type: 'salads'
})

const bonuslar = reactive<Section>({
    form: { name: '', description: '', image_url: '', imageUploading: false },
    items: [],
    type: 'bonuses'
})

const dasturxon = reactive<Record<string, Section>>({
    "To'y dasturxoni": {
        form: { name: '', description: '', image_url: '', imageUploading: false },
        items: [],
        type: 'wedding_table',
        category_id: 1
    },
    "Qo'shimcha noz ne'matlar": {
        form: { name: '', description: '', image_url: '', imageUploading: false },
        items: [],
        type: 'wedding_table',
        category_id: 2
    }
})

const uploadImage = useUploadImage()

function handleImageUpload(e: Event, form: FormState) {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    form.imageUploading = true

    uploadImage.mutate(file, {
        onSuccess(data: any) {
            form.image_url = data?.image
            form.imageUploading = false
        },
        onError() {
            form.image_url = ''
            form.imageUploading = false
        }
    })

    target.value = ''
}

function removeImage(form: FormState) {
    form.image_url = ''
}

const createProduct = useCreateTariffProduct()

function addProduct(section: Section) {
    if (!props.tariffId || !section.form.name || !section.form.image_url) return

    const payload: any = {
        tariff_id: props.tariffId,
        type: section.type,
        name: section.form.name,
        description: section.form.description,
        image_url: section.form.image_url
    }

    if (section.category_id) {
        payload.category_id = Number(section.category_id)
    }

    createProduct.mutate(payload, {
        onSuccess(data: Product[] | Product) {
            if (Array.isArray(data)) {
                // Faqat category_id number bo‘lsa, type va category_id bo‘yicha filter
                if (typeof section.category_id === 'number') {
                    section.items = data.filter(
                        (item) =>
                            item.type === section.type &&
                            Number(item.category_id) === section.category_id
                    )
                } else {
                    // category_id yo‘q bo‘lsa, faqat type bo‘yicha filter
                    section.items = data.filter(
                        (item) => item.type === section.type
                    )
                }
            } else if (data) {
                section.items.unshift(data)
            }
            section.form.name = ''
            section.form.description = ''
            section.form.image_url = ''
        }
    })
}

function removeProduct(section: Section, id: number) {
    section.items = section.items.filter((i) => i.id !== id)
}

</script>

<template>
    <div>
        <!-- Tabs -->
        <div class="flex overflow-x-auto gap-2 pb-2 whitespace-nowrap">
            <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
                class="px-4 py-2 rounded-lg transition font-medium"
                :class="activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-200'">
                {{ tab.label }}
            </button>
        </div>

        <!-- Taomlar -->
        <div v-if="activeTab === 'taomlar'" class="flex flex-col gap-6 mt-4">
            <div v-for="(section, label) in taomlar" :key="label" class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between mb-2 font-semibold">
                    <span>{{ label }}</span>
                    <button @click="addProduct(section)"
                        class="text-xl px-2 py-1 rounded-lg hover:bg-gray-100">+</button>
                </div>
                <div class="flex flex-col gap-2">
                    <input v-model="section.form.name" class="input" placeholder="Taom nomi" />
                    <input v-model="section.form.description" class="input" placeholder="Taom tavsifi" />
                    <div>
                        <label v-if="!section.form.image_url"
                            class="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative">
                            <span v-if="section.form.imageUploading">
                                <Icon name="i-heroicons-arrow-path-20-solid" class="animate-spin" size="32" />
                            </span>
                            <span v-else>
                                <Icon name="custom:plus-image" size="32" />
                            </span>
                            <input type="file" class="hidden" accept="image/*"
                                @change="e => handleImageUpload(e, section.form)"
                                :disabled="section.form.imageUploading || !!section.form.image_url" />
                        </label>
                        <div v-else class="relative w-24 h-24 rounded-lg overflow-hidden group">
                            <img :src="`${imageUrl}/${section.form.image_url}`" alt="preview"
                                class="object-cover w-full h-full" />
                            <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80"
                                variant="soft" color="neutral" icon="i-heroicons-x-mark"
                                @click="removeImage(section.form)" />
                        </div>
                    </div>
                </div>
                <div v-for="item in section.items" :key="item.id"
                    class="flex items-center gap-2 mt-4 bg-gray-50 rounded-lg p-2">
                    <NuxtImg v-if="item.image_url" :src="`${imageUrl}/${item.image_url}`"
                        class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1">
                        <div class="font-semibold">{{ item.name }}</div>
                        <div class="text-xs text-gray-500">{{ item.description }}</div>
                    </div>
                    <button @click="removeProduct(section, item.id)" class="text-red-500 text-xl">🗑️</button>
                </div>
            </div>
        </div>

        <!-- Salatlar -->
        <div v-if="activeTab === 'salatlar'" class="flex flex-col gap-6 mt-4">
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between mb-2 font-semibold">
                    <span>Salatlar</span>
                    <button @click="addProduct(salatlar)"
                        class="text-xl px-2 py-1 rounded-lg hover:bg-gray-100">+</button>
                </div>
                <div class="flex flex-col gap-2">
                    <input v-model="salatlar.form.name" class="input" placeholder="Salat nomi" />
                    <input v-model="salatlar.form.description" class="input" placeholder="Salat tavsifi" />
                    <div>
                        <label v-if="!salatlar.form.image_url"
                            class="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative">
                            <span v-if="salatlar.form.imageUploading">
                                <Icon name="i-heroicons-arrow-path-20-solid" class="animate-spin" size="32" />
                            </span>
                            <span v-else>
                                <Icon name="custom:plus-image" size="32" />
                            </span>
                            <input type="file" class="hidden" accept="image/*"
                                @change="e => handleImageUpload(e, salatlar.form)"
                                :disabled="salatlar.form.imageUploading || !!salatlar.form.image_url" />
                        </label>
                        <div v-else class="relative w-24 h-24 rounded-lg overflow-hidden group">
                            <img :src="`${imageUrl}/${salatlar.form.image_url}`" alt="preview"
                                class="object-cover w-full h-full" />
                            <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80"
                                variant="soft" color="neutral" icon="i-heroicons-x-mark"
                                @click="removeImage(salatlar.form)" />
                        </div>
                    </div>
                </div>
                <div v-for="item in salatlar.items" :key="item.id"
                    class="flex items-center gap-2 mt-4 bg-gray-50 rounded-lg p-2">
                    <img v-if="item.image_url" :src="`${imageUrl}/${item.image_url}`"
                        class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1">
                        <div class="font-semibold">{{ item.name }}</div>
                        <div class="text-xs text-gray-500">{{ item.description }}</div>
                    </div>
                    <button @click="removeProduct(salatlar, item.id)" class="text-red-500 text-xl">🗑️</button>
                </div>
            </div>
        </div>

        <!-- To'y dasturxoni -->
        <div v-if="activeTab === 'dasturxon'" class="flex flex-col gap-6 mt-4">
            <div v-for="(section, label) in dasturxon" :key="label" class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between mb-2 font-semibold">
                    <span>{{ label }}</span>
                    <button @click="addProduct(section)"
                        class="text-xl px-2 py-1 rounded-lg hover:bg-gray-100">+</button>
                </div>
                <div class="flex flex-col gap-2">
                    <input v-model="section.form.name" class="input" placeholder="Tarif nomi" />
                    <input v-model="section.form.description" class="input" placeholder="Tarif tavsifi" />
                    <div>
                        <label v-if="!section.form.image_url"
                            class="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative">
                            <span v-if="section.form.imageUploading">
                                <Icon name="i-heroicons-arrow-path-20-solid" class="animate-spin" size="32" />
                            </span>
                            <span v-else>
                                <Icon name="custom:plus-image" size="32" />
                            </span>
                            <input type="file" class="hidden" accept="image/*"
                                @change="e => handleImageUpload(e, section.form)"
                                :disabled="section.form.imageUploading || !!section.form.image_url" />
                        </label>
                        <div v-else class="relative w-24 h-24 rounded-lg overflow-hidden group">
                            <img :src="`${imageUrl}/${section.form.image_url}`" alt="preview"
                                class="object-cover w-full h-full" />
                            <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80"
                                variant="soft" color="neutral" icon="i-heroicons-x-mark"
                                @click="removeImage(section.form)" />
                        </div>
                    </div>
                </div>
                <div v-for="item in section.items" :key="item.id"
                    class="flex items-center gap-2 mt-4 bg-gray-50 rounded-lg p-2">
                    <img v-if="item.image_url" :src="`${imageUrl}/${item.image_url}`"
                        class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1">
                        <div class="font-semibold">{{ item.name }}</div>
                        <div class="text-xs text-gray-500">{{ item.description }}</div>
                    </div>
                    <button @click="removeProduct(section, item.id)" class="text-red-500 text-xl">🗑️</button>
                </div>
            </div>
        </div>

        <!-- Bonuslar -->
        <div v-if="activeTab === 'bonus'" class="flex flex-col gap-6 mt-4">
            <div class="bg-white rounded-lg p-4 shadow">
                <div class="flex items-center justify-between mb-2 font-semibold">
                    <span>Bonuslar</span>
                    <button @click="addProduct(bonuslar)"
                        class="text-xl px-2 py-1 rounded-lg hover:bg-gray-100">+</button>
                </div>
                <div class="flex flex-col gap-2">
                    <input v-model="bonuslar.form.name" class="input" placeholder="Bonus nomi" />
                    <input v-model="bonuslar.form.description" class="input" placeholder="Bonus tavsifi" />
                    <div>
                        <label v-if="!bonuslar.form.image_url"
                            class="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative">
                            <span v-if="bonuslar.form.imageUploading">
                                <Icon name="i-heroicons-arrow-path-20-solid" class="animate-spin" size="32" />
                            </span>
                            <span v-else>
                                <Icon name="custom:plus-image" size="32" />
                            </span>
                            <input type="file" class="hidden" accept="image/*"
                                @change="e => handleImageUpload(e, bonuslar.form)"
                                :disabled="bonuslar.form.imageUploading || !!bonuslar.form.image_url" />
                        </label>
                        <div v-else class="relative w-24 h-24 rounded-lg overflow-hidden group">
                            <img :src="`${imageUrl}/${bonuslar.form.image_url}`" alt="preview"
                                class="object-cover w-full h-full" />
                            <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80"
                                variant="soft" color="neutral" icon="i-heroicons-x-mark"
                                @click="removeImage(bonuslar.form)" />
                        </div>
                    </div>
                </div>
                <div v-for="item in bonuslar.items" :key="item.id"
                    class="flex items-center gap-2 mt-4 bg-gray-50 rounded-lg p-2">
                    <img v-if="item.image_url" :src="`${imageUrl}/${item.image_url}`"
                        class="w-16 h-16 object-cover rounded-lg" />
                    <div class="flex-1">
                        <div class="font-semibold">{{ item.name }}</div>
                        <div class="text-xs text-gray-500">{{ item.description }}</div>
                    </div>
                    <button @click="removeProduct(bonuslar, item.id)" class="text-red-500 text-xl">🗑️</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>