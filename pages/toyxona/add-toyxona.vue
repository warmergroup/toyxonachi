<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const maxImages = 5;
const images = ref<string[]>([]);

function onFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
            if (images.value.length < maxImages) {
                images.value.push(event.target.result);
            }
        }
    };
    reader.readAsDataURL(file);
    // Reset input value to allow uploading the same file again
    (e.target as HTMLInputElement).value = '';
}

function removeImage(idx: number) {
    images.value.splice(idx, 1);
}
</script>

<template>
    <div class="flex flex-col lg:pt-20 px-4">
        <h2>To'yxona rasmlari</h2>
        <div class="flex items-start">
            <UiImageUploader />
        </div>
    </div>
</template>