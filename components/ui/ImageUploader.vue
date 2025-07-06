<script setup lang="ts">
import { useUploadImage } from '~/data';
import { useToyxonaFormStore } from '~/stores/toyxonaForm.store';
const { t } = useI18n()
const toyxonaFormStore = useToyxonaFormStore();
const uploadImage = useUploadImage();
const config = useRuntimeConfig()
const imageUrl = config.public.imageUrl
type ImageType = string | { image_url: string };

const images = computed<ImageType[]>({
    get: () => toyxonaFormStore.images as ImageType[],
    set: (val: ImageType[]) => toyxonaFormStore.setImages(
        val.map(img => typeof img === 'string' ? img : img.image_url)
    )
});

function getImageSrc(img: ImageType) {
    const url = typeof img === 'string' ? img : img.image_url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `${imageUrl}/${url}`;
}
const max = 5


async function onFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files[0]) return;
    const file = files[0];
    if (images.value.length >= max) return;
    try {
        const data = await uploadImage.mutateAsync(file);
        if (data?.image) {
            toyxonaFormStore.addImage(data.image);
        }
    } catch (err) {
        alert('Rasm yuklashda xatolik!');
    }
    (e.target as HTMLInputElement).value = '';
}

function removeImage(idx: number) {
    toyxonaFormStore.removeImage(idx);
}

</script>

<template>
    <div class="bg-white rounded-2xl p-4">
        <h2>{{ t('toyxonaForm.imageFild') }}</h2>
        <div class="grid grid-cols-3 gap-4 mt-4">
            <!-- Upload button always visible, but disabled if max reached -->
            <div class="w-22 h-22 md:w-28  md:h-28 border border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative"
                :class="{ 'opacity-50 pointer-events-none': images.length >= max }">
                <label class="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Icon name="custom:plus-image" />
                    <p class="text-gray-400 mt-2 select-none">click here</p>
                    <input type="file" class="hidden" accept="image/*" @change="onFileChange"
                        :disabled="images.length >= max" />
                </label>
                <div v-if="images.length >= max"
                    class="absolute inset-0 bg-white/60 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400 text-xs"></span>
                </div>
            </div>
            <!-- Image previews -->
            <div v-for="(img, idx) in images" :key="idx"
                class="relative w-22 h-22 md:w-28 md:h-28 rounded-lg overflow-hidden group">
                <NuxtImg :src="getImageSrc(img)" alt="preview" class="object-cover w-full h-full" />
                <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80" variant="soft"
                    color="neutral" icon="custom:remove" @click="removeImage(idx)" />
            </div>
        </div>
    </div>
</template>

<!-- //https://toyxonachi.uz/storage/images/ae8da7aa-893e-49d8-a1fe-7038d45e6bac.jpg -->