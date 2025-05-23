<script setup lang="ts">
import { useI18n } from "vue-i18n";

const route = useRoute();

const { t, locale } = useI18n();
</script>
<template>
  <nav
    class="container mx-auto fixed bottom-0 flex justify-between items-center bg-white w-full min-h-16 border-t border-gray-300 px-5 py-3">

    <div class="container mx-auto px-5 w-full md:w-3/5 lg:w-fit flex gap-5 justify-between items-center ">
      <NuxtLink :to="`/${locale}`" :class="{ 'text-[var(--primary-color)]': route.path === `/${locale}` }"
        class="flex flex-col items-center justify-center">
        <UIcon name="custom:home" />
        <span>{{ t('common.main') }}</span>
      </NuxtLink>
      <NuxtLink :to="`/${locale}/venues`" :class="{ 'text-[var(--primary-color)]': route.path === `/${locale}/venues` }"
        class="flex flex-col items-center justify-center">
        <UIcon name="custom:navbar-search" />
        <span>{{ t('common.venues') }}</span>
      </NuxtLink>

      <NuxtLink :to="`/${locale}/profile/[id]`"
        :class="{ 'text-[var(--primary-color)]': route.path === `/${locale}/profile` }"
        class="flex flex-col items-center justify-center">
        <UIcon size="1.3rem" class="text-black" name="custom:person" />
        <span>{{ t('common.profile') }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>
