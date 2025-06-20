<script lang="ts" setup>
import { openState } from '~/stores/isOpen.store';

const openComponent = openState();
const { t } = useI18n();
interface Props {
  name: string;
  phone: string;
  status: string;
  role: string;
  avatar?: string;
  isLoading?: boolean;
}

const props = defineProps<Props>();

// Role matnini olish
const roleText = computed(() => {
  switch (props.role) {
    case 'user':
      return t('profile.user');
    case 'admin':
      return t('profile.admin');
    case 'superadmin':
      return t('profile.superAdmin');
    default:
      return t('profile.user');
  }
});
// Avatar URL ni tekshirish
const avatarUrl = computed(() => {
  return props.avatar === 'https://toyxonachi.uz/storage/images' ? '/avatar.jpg' : props.avatar;
});
const image = computed(() => {
  return props.avatar === 'https://toyxonachi.uz/storage/images' ? '/avatar.jpg' : props.avatar;
});
// const uploadImage = () => {

// }


</script>

<template>
  <div class="flex items-center justify-between rounded-md bg-white p-4">
    <div class="flex items-center gap-4">
      <div class="relative w-16 md:w-20 lg:w-24 h-16 md:h-20 lg:h-24 flex items-center justify-center rounded-full">
        <NuxtImg v-if="image" :src="image" loading="lazy" alt="User Avatar"
          class="w-full rounded-full aspect-square object-cover" />
        <NuxtImg v-else src="/avatar.jpg" />
        <div @click=""
          class="absolute right-0 bottom-0 z-10 w-6 h-6 flex items-center justify-center overflow-hidden bg-gray-200 border border-gray-400 rounded-full">
          <div class="flex items-center p-1 justify-center w-full">
            <Icon name="custom:camera" class="w-4 object-cover" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <h2 class="text-lg font-semibold">{{ name }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ phone }}</p>
        <span class="bg-[var(--success-color)] py-1.5 px-3 rounded-full text-white text-sm">
          {{ t('profile.role') }} : {{ roleText }}
        </span>
      </div>
    </div>
    <div class="w-20 h-20 flex items-center justify-end cursor-pointer" @click="openComponent.onOpen('editProfile')">
      <Icon size="15px" name="custom:chevron-right" />
    </div>
  </div>
</template>