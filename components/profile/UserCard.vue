<script lang="ts" setup>
import { openState } from '~/stores/isOpen.store';

const config = useRuntimeConfig()
const baseImgUrl = config.public.imgUrl || 'https://api.toyxonachi.uz/storage/images'

const { formatPhone } = useFormat();
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
      return t('profile.superadmin');
    default:
      return t('profile.user');
  }
});
// Avatar URL ni tekshirish
const avatarUrl = computed(() => {
  return props.avatar === 'https://toyxonachi.uz/storage/images' ? '/avatar.jpg' : props.avatar;
});
const image = computed(() => {
  // Agar avatar yo'q yoki faqat katalog bo'lsa yoki bo'sh bo'lsa
  if (
    !props.avatar ||
    props.avatar === baseImgUrl ||
    props.avatar === baseImgUrl + '/' ||
    props.avatar === 'https://toyxonachi.uz/storage/images' ||
    props.avatar === 'https://toyxonachi.uz/storage/images/'
  ) {
    return '/avatar.jpg'
  }
  // Agar avatar faqat rasm nomi bo'lsa (masalan, avatar.png)
  if (!props.avatar.startsWith('http')) {
    return `${baseImgUrl}/${props.avatar}`
  }
  // To'liq url bo'lsa
  return props.avatar
})
// const uploadImage = () => {

// }


</script>

<template>
  <div class="flex items-center justify-between rounded-md bg-white p-4">
    <div class="flex items-center gap-4">
      <div class="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-full">
        <NuxtImg :src="image" loading="lazy" :alt="name" class="w-full h-full rounded-full aspect-square object-cover"
          :class="image === '/avatar.jpg' ? 'scale-130 md:scale-150' : 'w-full h-full'" />
        <div @click=""
          class="absolute right-0 bottom-0 z-10 w-6 h-6 flex items-center justify-center overflow-hidden bg-gray-200 border border-gray-400 rounded-full">
          <div class="flex items-center p-1 justify-center w-full">
            <Icon name="custom:camera" class="w-4 object-cover" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <h2 class="text-lg font-semibold capitalize">{{ name }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">+{{ formatPhone(phone) }}</p>
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