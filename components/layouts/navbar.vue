<script setup>
import { useRoute } from 'vue-router'

const { t, locale } = useI18n();
const route = useRoute();
</script>

<template>
  <nav
    class="container mx-auto fixed top-0 flex justify-between items-center bg-white z-50 w-full h-16 border-b border-gray-300 px-5 py-5">
    <NuxtLink :to="`/${locale}`" class="hidden md:block">
      <h1 class="text-2xl font-bold">To'yxonachi</h1>
    </NuxtLink>

    <div class="flex w-full md:w-3/5 lg:w-fit justify-between items-center gap-5">
      <NuxtLink :to="`/${locale}`" class="hidden lg:flex justify-between items-center gap-1"
        :class="{ 'text-[var(--primary-color)]': route.path === `/${locale}` }">
        <UIcon name="custom:home" />
        <span>{{ t('common.main') }}</span>
      </NuxtLink>
      <NuxtLink :to="`/${locale}/venues`" class="hidden lg:flex justify-between items-center gap-1"
        :class="{ 'text-[var(--primary-color)]': route.path.startsWith(`/${locale}/venues`) }">
        <UIcon name="custom:navbar-search" />
        <span>{{ t('common.venues') }}</span>
      </NuxtLink>

      <UiSearchPanel />
    </div>

    <div class="flex justify-between items-center gap-5 ">
      <UiLangSwitcher class="hidden lg:block" />
      <UiNotification />
      <NuxtLink :to="`/${locale}/profile`" class="hidden lg:block"
        :class="{ 'text-[var(--primary-color)]': route.path.startsWith(`/${locale}/profile`) }">
        <UIcon size="1.3rem" name="custom:person" />
      </NuxtLink>
    </div>
  </nav>
</template>
