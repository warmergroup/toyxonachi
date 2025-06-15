<script setup lang="ts">
import { openState } from '~/stores/isOpen.store';

const { isLargeScreen } = useScreenSize();

const { t } = useI18n();
const openComponent = openState();

</script>

<template>
    <div class="flex flex-col gap-4 rounded-md bg-white p-4 ">
        <div v-if="!isLargeScreen" class="flex items-center justify-between cursor-pointer"
            @click="openComponent.onOpen('changeLanguage')">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:globe-02" />
                </span>
                <p class="text-black text-base font-medium">{{ t('common.appLanguage') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>
        <USeparator />
        <div class="flex items-center justify-between cursor-pointer" @click="openComponent.onOpen('myVenues')">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:list" />
                </span>
                <p class="text-black text-base font-medium">{{ t('profile.myVenues') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>
        <USeparator />
        <div class="flex items-center justify-between cursor-pointer" @click="openComponent.onOpen('about')">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:information" />
                </span>
                <p class="text-black text-base font-medium">{{ t('about.aboutUs') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>
        <USeparator />
        <div class="flex items-center justify-between cursor-pointer" @click="openComponent.onOpen('discounts')">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:discount" />
                </span>
                <p class="text-black text-base font-medium">{{ t('venue.discount') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>
    </div>
</template>