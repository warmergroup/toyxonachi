<script setup lang="ts">
const { t } = useI18n();
import Drawer from '../ui/Drawer.vue';
import ChangeLanguage from './ChangeLanguage.vue';
import { openState } from '@/stores/isOpen.store';

const openDrawer = openState();
</script>

<template>
    <div class="flex flex-col gap-4 rounded-lg bg-white p-4">
        <div class="flex items-center justify-between" @click="openDrawer.onOpen('changeLanguage')">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:globe-02" />
                </span>
                <p class="text-black text-base font-medium">{{ t('common.appLanguage') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>

        <Drawer :isOpen="openDrawer.isOpen && openDrawer.drawerType === 'changeLanguage'" @close="openDrawer.onClose()"
            :title="t('common.changeLanguage')">
            <ChangeLanguage />
        </Drawer>

        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                    <Icon size="20px" name="custom:information" />
                </span>
                <p class="text-black text-base font-medium">{{ t('common.aboutUs') }}</p>
            </div>
            <Icon size="15px" name="custom:chevron-right" />
        </div>
    </div>
</template>