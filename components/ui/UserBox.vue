<script lang="ts" setup>

const { t } = useI18n();
interface Props {
  name: string;
  phone: string;
  status: string;
  role: string;
  avatar?: string;
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
</script>

<template>
  <div class="flex items-center justify-between rounded-md bg-white p-4">
    <div class="flex items-center gap-4">
      <NuxtImg :src="image" loading="lazy" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" />
      <div class="flex flex-col gap-1.5">
        <h2 class="text-lg font-semibold">{{ name }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ phone }}</p> <span
          class="bg-[var(--success-color)] py-1.5 px-3 rounded-full text-white text-sm">
          {{ t('profile.role') }} : {{ roleText }}
        </span>
      </div>
    </div>
    <Icon size="15px" name="custom:chevron-right" />
  </div>
</template>