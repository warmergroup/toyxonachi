<script setup lang="ts">
import { openState } from '~/stores/isOpen.store';
import { useAuthStore } from '~/stores/auth.store';
import { useLogout } from '~/data/auth/logout';

const { isLargeScreen } = useScreenSize();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const { t } = useI18n();
const openComponent = openState();
console.log('Open Component:', openComponent.isOpen);
const onClose = () => {
  openComponent.onClose();
}
onBeforeRouteLeave(() => {
  openComponent.onClose();
})

// Logout mutation
const { mutate: logout, isPending: isLoggingOut } = useLogout();

// Handle logout click
const handleLogout = () => {
  if (confirm(t('logout.confirmMessage'))) {
    logout();
  }
};

</script>
<template>
  <div class="lg:pt-16 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] pb-20">
    <div class="w-full p-4 bg-white flex items-center justify-start ">
      <h2 class="text-lg font-medium">{{ t('common.profile') }}</h2>
    </div>

    <div class="w-full lg:w-1/3 px-4 flex flex-col justify-between gap-4">
      <div class="w-full flex flex-col gap-4">
        <ProfileUserCard v-if="user" :isLoading="authStore.isLoading" :name="user.name" :phone="user.phone"
          :status="user.status" :role="user.role" :avatar="user.avatar" />
        <UiRegisterPrompt v-else />
        <ProfileActions :role="user?.role" />
      </div>
      <UButton v-if="user" class="text-center flex items-center justify-center" size="xl" color="secondary"
        :label="t('logout.logoutTitle')" :loading="isLoggingOut" :disabled="isLoggingOut" @click="handleLogout" />
    </div>

    <UiDrawer v-if="!isLargeScreen" :is-open="openComponent.isOpen && openComponent.componentType === 'changeLanguage'"
      :title="t('common.changeLanguage')" @close="onClose">
      <MobileChangeLanguage />
    </UiDrawer>
    <UiDrawer v-if="!isLargeScreen" :is-open="openComponent.isOpen && openComponent.componentType === 'editProfile'"
      :title="t('profileActions.editProfile')" @close="onClose">
      <ProfileEdit />
    </UiDrawer>
    <UiSlideOver v-if="isLargeScreen" :is-open="openComponent.isOpen && openComponent.componentType === 'editProfile'"
      :title="t('profileActions.editProfile')" @close="onClose">
      <ProfileEdit />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'auth'" @close="onClose">
      <ProfileAuth />
    </UiSlideOver>
    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'about'" :title="t('about.aboutUs')"
      @close="onClose">
      <TheAbout />
    </UiSlideOver>
    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'adminToyxonalar'"
      :title="t('admin.myWeddingHalls')" @close="onClose">
      <AdminToyxonalar />
    </UiSlideOver>
    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'discounts'"
      :title="t('venue.discount')" @close="onClose">
      <AdminDiscounts />
    </UiSlideOver>
  </div>
</template>
