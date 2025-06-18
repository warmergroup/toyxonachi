<script setup>
import { openState } from '~/stores/isOpen.store';
import { useAuthStore } from '~/stores/auth.store';
const { isLargeScreen } = useScreenSize();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const { t } = useI18n();
const openComponent = openState();
const onClose = () => {
    openComponent.onClose();
}


</script>
<template>
    <div class="lg:pt-16 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] pb-20">
        <div class="w-full p-4 bg-white flex items-center justify-start ">
            <h2 class="text-lg font-medium">{{ t('common.profile') }}</h2>
        </div>

        <div class="w-full lg:w-1/3 px-4 flex flex-col justify-between gap-4">
            <div class="w-full flex flex-col gap-4">
                <UiUserBox v-if="user" :name="user.name" :phone="user.phone" :status="user.status" :role="user.role"
                    :avatar="user.avatar" />
                <UiRegisterPrompt v-if="!user" />
                <MobileProfileSettings />
            </div>

            <UiMainButton v-if="!isLargeScreen" :label="t('profile.logout')" />
        </div>

        <UiDrawer v-if="!isLargeScreen"
            :isOpen="openComponent.isOpen && openComponent.componentType === 'changeLanguage'"
            :title="t('common.changeLanguage')" @close="onClose">
            <MobileChangeLanguage />
        </UiDrawer>

        <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'register'"
            :title="t('profile.register')" @close="onClose">
            <FormRegister />
        </UiSlideOver>
        <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'about'"
            :title="t('about.aboutUs')" @close="onClose">
            <TheAbout />
        </UiSlideOver>
        <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'myVenues'"
            :title="t('profile.myVenues')" @close="onClose">
            <AdminVenues />
        </UiSlideOver>
        <UiSlideOver :isOpen="openComponent.isOpen && openComponent.componentType === 'discounts'"
            :title="t('venue.discount')" @close="onClose">
            <AdminDiscounts />
        </UiSlideOver>
    </div>
</template>
