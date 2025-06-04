<script setup lang="ts">
import { useLanguage } from '@/hooks/useLanguage';
import { useLanguageStore } from '@/stores/language';
import { openState } from '@/stores/isOpen.store';

const langStore = useLanguageStore();
const drawerState = openState();
const { changeLanguage } = useLanguage();

// Define the Language type locally to match the expected structure
interface Language {
    code: 'uz' | 'ru' | 'en';
    name: string;
    flag: string;
}

const items: Language[] = [
    { code: 'uz', name: 'O’zbekcha', flag: 'custom:uz-flag' },
    { code: 'ru', name: 'Русский', flag: 'custom:ru-flag' },
    { code: 'en', name: 'English', flag: 'custom:en-flag' },
];

async function handleLanguageChange(langCode: string) {
    const selectedLanguage = items.find(item => item.code === langCode);
    if (selectedLanguage) {
        await changeLanguage(selectedLanguage.code); // Pass only the code to match the expected type
        drawerState.onClose();
    }
}
</script>

<template>
    <div class="space-y-4">
        <div v-for="item in items" :key="item.code" class="flex items-center gap-4 p-4 rounded-lg border cursor-pointer"
            :class="{
                'border-primary': langStore.lang === item.code,
                'border-gray-300': langStore.lang !== item.code,
            }" @click="handleLanguageChange(item.code)">
            <Icon :name="item.flag" size="24px" />
            <div class="flex-1">
                <p class="text-base font-medium">{{ item.name }}</p>
            </div>
            <div v-if="langStore.lang === item.code"
                class="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                <div class="w-3 h-3 bg-primary rounded-full"></div>
            </div>
        </div>
    </div>
</template>