<script setup lang="ts">
import { useUploadImage } from '~/data';
import { useTotxonaFormStore } from '~/stores/toyxonaForm.store';

const toyxonaFormStore = useTotxonaFormStore();
const uploadImage = useUploadImage();
const config = useRuntimeConfig()
const imageUrl = config.public.imageUrl
const images = computed({
    get: () => toyxonaFormStore.images,
    set: (val: string[]) => toyxonaFormStore.setImages(val)
});
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
        <h2>To'yxona rasmlari</h2>
        <div class="grid grid-cols-3 gap-4 mt-4">
            <!-- Upload button always visible, but disabled if max reached -->
            <div class="w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-gray-50 relative"
                :class="{ 'opacity-50 pointer-events-none': images.length >= max }">
                <label class="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Icon name="custom:plus-image" size="32px" />
                    <p class="text-gray-400 mt-2">Загрузить</p>
                    <input type="file" class="hidden" accept="image/*" @change="onFileChange"
                        :disabled="images.length >= max" />
                </label>
                <div v-if="images.length >= max"
                    class="absolute inset-0 bg-white/60 rounded-lg flex items-center justify-center">
                    <span class="text-gray-400 text-xs">Maksimal rasm</span>
                </div>
            </div>
            <!-- Image previews -->
            <div v-for="(img, idx) in images" :key="idx" class="relative w-28 h-28 rounded-lg overflow-hidden group">
                <NuxtImg :src="`${imageUrl}/${img}`" alt="preview" class="object-cover w-full h-full" />
                <UButton class="absolute top-1 right-1 bg-black/40 rounded-full hover:bg-black/80" variant="soft"
                    color="neutral" icon="custom:remove" @click="removeImage(idx)" />
            </div>
        </div>
    </div>
</template>

<!-- //https://toyxonachi.uz/storage/images/ae8da7aa-893e-49d8-a1fe-7038d45e6bac.jpg -->