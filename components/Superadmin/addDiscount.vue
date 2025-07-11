<script setup lang="ts">
import { ref } from 'vue'
import { useUploadImage, useInfiniteToyxonalarQuery, useAddDiscount } from '~/data'

const config = useRuntimeConfig()
const imgUrl = config.public.imageUrl

const toast = useToast()
const { t } = useI18n()
const uploadImage = useUploadImage()
const addDiscount = useAddDiscount()
const uploading = ref(false)
const imageUrl = ref('')
const selectedToyxonaId = ref<number | null>(null)
const notes = ref('notes')
const isActive = ref(1)

const {
    data: toyxonalarData,
    isLoading: toyxonaLoading,
    fetchNextPage,
    isFetchingNextPage,
    error,
    refetch
} = useInfiniteToyxonalarQuery(20, 'admin');

function onFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return
    uploading.value = true
    uploadImage.mutate(file, {
        onSuccess: (res) => {
            imageUrl.value = res.image
            uploading.value = false
        },
        onError: () => {
            toast.add({
                description: t('discount.addError'),
                color: 'error'
            })
            uploading.value = false
        }
    })
}

const toyxonaOptions = computed(() => {
    return (toyxonalarData.value?.pages?.flat() || []).map((t: any) => ({
        label: t.name,
        value: t.id
    }))
})
const emit = defineEmits(['success'])
function handleSave() {
    if (!imageUrl.value || !selectedToyxonaId.value) {
        toast.add({ description: t('discount.selectImageAndHallError'), color: 'error' })
        return
    }
    addDiscount.mutate({
        notes: notes.value,
        image_url: imageUrl.value,
        is_active: isActive.value,
        wedding_hall_id: selectedToyxonaId.value
    }, {
        onSuccess: () => {
            toast.add({
                description: t('discount.addedSuccesfull'),
                color: 'success'
            })
            // Modalni yopish va discountList modalini ochish uchun emit
            // $emit('close') va $emit('open-discount-list') yoki prop orqali
            // emit('saved') deb parentga signal beramiz
            emit('success')
        },
        onError: (err: any) => {
            console.log(error)
            toast.add({
                title: t('error.title'),
                description: err.message,
                color: 'error'
            })
        }
    })
}

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full">
        <label v-if="!imageUrl" for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg v-if="!uploading" class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <div v-else class="mb-4">
                    <span class="text-gray-500">{{ t('common.loading') }}</span>
                </div>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" @change="onFileChange" :disabled="uploading" />
        </label>

        <div v-else class="w-full aspect-video flex items-center justify-center">
            <NuxtImg :src="`${imgUrl}/${imageUrl}`" alt="Yuklangan rasm" class="object-contain h-full rounded-lg" />
        </div>

        <div class="w-full">
            <label class="block mb-2 text-sm font-medium text-gray-700">Toyxona tanlang</label>
            <select v-model="selectedToyxonaId" class="w-full border rounded px-3 py-2">
                <option value="" disabled>Tanlang...</option>
                <option v-for="option in toyxonaOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div
            class="container mx-auto absolute bottom-0 left-0 right-0 flex items-center justify-center bg-white w-full min-h-16 border-t border-gray-300 px-5 py-3 z-30">
            <UButton class="w-full" color="primary" size="xl" :loading="addDiscount.isPending.value" @click="handleSave"
                :label="t('common.save')" />
        </div>
    </div>
</template>