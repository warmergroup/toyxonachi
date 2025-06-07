<script setup>
import { useScreenSize } from '~/hooks/useScreenSize';
import { openState } from '~/stores/isOpen.store';
const { isLargeScreen } = useScreenSize();
const { t } = useI18n();
const openComponent = openState();

const onClose = () => {
    openComponent.onClose();
}

</script>
<template>
    <div class="lg:pt-24 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] p-4">
        <h1 class="text-2xl font-bold">{{ t('common.profile') }}</h1>
        <UiRegisterPrompt />
        <MobileProfileSettings v-if="!isLargeScreen" />
    </div>

    <UiDrawer :isOpen="openComponent.isOpen && openComponent.componentType === 'changeLanguage'"
        :title="t('common.changeLanguage')" @close="onClose">
        <MobileChangeLanguage />
    </UiDrawer>
    <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'about'"
        @close="openComponent.onClose()" :title="t('about.aboutUs')">
        <TheAbout />
    </UiSlideOver>
</template>
