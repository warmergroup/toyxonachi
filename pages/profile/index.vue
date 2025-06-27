<script setup lang="ts">
import { openState } from '~/stores/isOpen.store';
import { useAuthStore } from '~/stores/auth.store';
import { useLogout } from '~/data/auth/logout';
import { SuperadminAdmins, UiToyxonalarList, LazyUiModalToyxonaAction } from '#components';
import { useOverlay } from '#imports'
import type { IToyxonalar } from '~/interfaces';

const { isLargeScreen } = useScreenSize();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLoading = computed(() => authStore.isLoading);
const { t } = useI18n();
const toyxonalarListRef = ref()
const adminListRef = ref()
const superadminListRef = ref()
const openComponent = openState();
const onClose = () => {
  openComponent.onClose();
}
const showAddAdmins = ref(false);
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

const overlay = useOverlay()
const selectedToyxona = ref<IToyxonalar | null>(null)
const selectedTab = ref<'active' | 'archive'>('active') // yoki 'archive', kerakli joyda o'zgartirasiz

async function openToyxonaActionModal(toyxona: IToyxonalar, tab: string) {
  // Ensure tab is either 'active' or 'archive'
  if (tab !== 'active' && tab !== 'archive') return;
  selectedToyxona.value = toyxona
  selectedTab.value = tab as 'active' | 'archive'
  const modal = overlay.create(LazyUiModalToyxonaAction, {
    props: {
      toyxona: toyxona,
      tab: tab,
      modelValue: true
    }
  })
  const instance = modal.open()
  const result = await instance.result
  if (result === 'success') {
    // Ma'lumotlarni yangilash yoki boshqa action
    toyxonalarListRef.value?.refreshList()
    adminListRef.value?.refreshList()
    superadminListRef.value?.refreshList()
    // fetchNextPage() yoki boshqa funksiyani chaqiring
  }
}

const createdToyxonaId = ref<number | null>(null);

const handleToyxonaCreated = (id: number) => {
  onClose(); // Avvalgi slideoverni yopamiz
  openComponent.onOpen('createTariff', { toyxonaId: id }); // Yangi componentni id bilan ochamiz
};

</script>
<template>
  <div class="lg:pt-16 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] pb-20">
    <div class="w-full p-4 bg-white flex items-center justify-start ">
      <h2 class="text-lg font-medium">{{ t('common.profile') }}</h2>
    </div>

    <div class="w-full lg:w-2/3 px-4 flex flex-col justify-between gap-4">
      <div class="w-full flex flex-col gap-4">
        <!-- <ProfileUserCardPlaceholder v-if="isLoading" /> -->
        <ProfileUserCard v-if="user && !isLoading" :name="user.name" :phone="user.phone" :status="user.status"
          :role="user.role" :avatar="user.avatar" />
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
      <UiToyxonalarList ref="adminListRef" @action="openToyxonaActionModal" />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'allVenues'"
      :title="t('superadmin.allWeddingHalls')" @close="onClose">
      <UiToyxonalarList ref="superadminListRef" @action="openToyxonaActionModal" />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'discounts'"
      :title="t('venue.discounts')" @close="onClose">
      <UiDiscountList />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'admins'"
      :title="t('profileActions.adminList')" @close="onClose">
      <SuperadminAdmins @add-admin="showAddAdmins = true" />
    </UiSlideOver>

    <UiSlideOver :is-open="showAddAdmins" :title="t('profileActions.addAdmin')" @close="showAddAdmins = false">
      <SuperadminAddAdmins />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'addToyxona'"
      :title="t('admin.addToyxona')" @close="onClose">
      <AdminToyxonaCreate @created="handleToyxonaCreated" />
    </UiSlideOver>

    <UiSlideOver :is-open="openComponent.isOpen && openComponent.componentType === 'createTariff'"
      :title="t('admin.createTariff')" @close="onClose">
      <AdminTarif :toyxona-id="openComponent.payload?.toyxonaId" />
    </UiSlideOver>

  </div>
</template>
