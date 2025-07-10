<script setup lang="ts">
import { openState } from '~/stores/isOpen.store';
import { useAuthStore } from '~/stores/auth.store';
import { useLogout, useGetMeQuery } from '~/data';
import { LazyUiModalToyxonaAction } from '#components';
import { useOverlay } from '#imports'
import type { IToyxonalar } from '~/interfaces';


const config = useRuntimeConfig();
const vapidKey = config.public.vapidKey;
const { isLargeScreen } = useScreenSize();
const { refetch: refetchMe } = useGetMeQuery()
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const isLoading = computed(() => authStore.isLoading);

const { t } = useI18n();
const toyxonalarListRef = ref()
const adminListRef = ref()
const superadminListRef = ref()
const openComponent = openState();
const onClose = () => openComponent.onClose();
const showAddAdmins = ref(false);
const showAddDiscount = ref(false);
onBeforeRouteLeave(onClose)

// Logout mutation
const { mutate: logout, isPending: isLoggingOut } = useLogout(vapidKey);
const handleLogout = () => {
  if (confirm(t('logout.confirmMessage'))) logout();
};

const overlay = useOverlay()
const selectedToyxona = ref<IToyxonalar | null>(null)
const selectedTab = ref<'active' | 'archive'>('active')

async function openToyxonaActionModal(toyxona: IToyxonalar, tab: string) {
  if (tab !== 'active' && tab !== 'archive') return;
  selectedToyxona.value = toyxona
  selectedTab.value = tab as 'active' | 'archive'
  const modal = overlay.create(LazyUiModalToyxonaAction, {
    props: { toyxona, tab, modelValue: true }
  })
  const instance = modal.open()
  const result = await instance.result
  if (result === 'success') {
    toyxonalarListRef.value?.refreshList()
    adminListRef.value?.refreshList()
    superadminListRef.value?.refreshList()
  }
}

function refreshDiscounts() {
  openComponent.onOpen('discounts')
}

const handleToyxonaCreated = ({ id, tariffs }: { id: number, tariffs: { id: number, name: string }[] }) => {
  onClose();
  toyxonalarListRef.value?.refreshList();
  adminListRef.value?.refreshList?.();
  superadminListRef.value?.refreshList?.();
  openComponent.onOpen('createTariff', { toyxonaId: id, tariffs });
};

function refreshToyxonalarList() {
  toyxonalarListRef.value?.refreshList();
  adminListRef.value?.refreshList?.();
  superadminListRef.value?.refreshList?.();
}


const { slideovers, drawers } = useProfileModals({
  t,
  isLargeScreen,
  openComponent,
  adminListRef,
  superadminListRef,
  showAddDiscount,
  showAddAdmins,
  handleToyxonaCreated,
  refreshToyxonalarList,
  openToyxonaActionModal,
  refetchMe,
});

</script>

<template>
  <div class="lg:pt-16 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] pb-20">
    <div class="w-full p-4 bg-white flex items-center justify-start ">
      <h2 class="text-lg font-medium">{{ t('common.profile') }}</h2>
    </div>

    <div class="w-full lg:w-2/3 px-4 flex flex-col justify-between gap-4">
      <div class="w-full flex flex-col gap-4">
        <client-only>
          <!-- 1. Ma'lumotlar yuklanayotgan bo'lsa, loader chiqadi -->
          <div v-if="isLoading && !user" class="flex items-center justify-center h-32">
            <span class="loader"></span>
          </div>
          <!-- 2. User yo'q bo'lsa, register prompt chiqadi -->
          <UiRegisterPrompt v-else-if="!user" />
          <!-- 3. User bor bo'lsa, UserCard chiqadi -->
          <ProfileUserCard v-else :name="user.name" :phone="user.phone" :status="user.status" :role="user.role ?? ''"
            :avatar="user.avatar" :is-loading="isLoading" :onAvatarUpdated="refetchMe" />
        </client-only>
        <ProfileActions :user="user || undefined" :key="user?.id" />
      </div>
      <ClientOnly>
        <UButton v-if="user" class="text-center flex items-center justify-center" size="xl" color="secondary"
          :label="t('logout.logoutTitle')" :loading="isLoggingOut" :disabled="isLoggingOut" @click="handleLogout" />
      </ClientOnly>
    </div>

    <!-- Drawerlar (mobil uchun) -->
    <template v-for="drawer in drawers" :key="drawer.key">
      <UiDrawer v-if="drawer.show" :is-open="drawer.show.value" :title="drawer.title()" @close="onClose">
        <component :is="drawer.component" v-bind="drawer.props" />
      </UiDrawer>
    </template>

    <!-- SlideOverlar (desktop va universal) -->
    <template v-for="item in slideovers" :key="item.key">
      <UiSlideOver v-if="item.show" :is-open="item.show.value" :title="item.title()" @close="onClose">
        <component :is="item.component" v-bind="typeof item.props === 'function' ? item.props() : item.props" />
      </UiSlideOver>
    </template>

    <!-- Maxsus holatlar uchun alohida SlideOver -->
    <UiSlideOver :is-open="showAddDiscount" @close="showAddDiscount = false">
      <SuperadminAddDiscount @success="refreshDiscounts" />
    </UiSlideOver>
    <UiSlideOver :is-open="showAddAdmins" :title="t('profileActions.addAdmin')" @close="showAddAdmins = false">
      <SuperadminAddAdmins />
    </UiSlideOver>
  </div>
</template>