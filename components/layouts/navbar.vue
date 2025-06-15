<script setup>
import {openState} from '~/stores/isOpen.store';

const {t} = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const openComponent = openState();


</script>

<template>
  <nav
    class="xl:container mx-auto xl:mx-auto fixed top-0 left-0 right-0 flex justify-between items-center bg-white z-50 w-full h-16 border-b border-gray-300 px-5 py-5">
    <NuxtLink :to="localePath('/')" class="hidden md:block">
      <h1 class="text-2xl font-bold">To'yxonachi</h1>
    </NuxtLink>

    <div class="flex w-full md:w-3/5 lg:w-fit justify-between items-center gap-5">
      <NuxtLink
        :to="localePath('/')" class="hidden lg:flex justify-between items-center gap-1"
        :class="{ 'text-[var(--primary-color)]': route.path === localePath('/') }">
        <UIcon name="custom:home"/>
        <span>{{ t('common.main') }}</span>
      </NuxtLink>
      <NuxtLink
        :to="localePath('/venues')" class="hidden lg:flex justify-between items-center gap-1"
        :class="{ 'text-[var(--primary-color)]': route.path.startsWith(localePath('/venues')) }">
        <UIcon name="custom:navbar-search"/>
        <span>{{ t('common.venues') }}</span>
      </NuxtLink>
      <UiSearchPanel/>
    </div>

    <div class="flex justify-between items-center gap-3">
      <UiLangSwitcher class="hidden lg:block"/>
      <Icon name="custom:bell" @click="openComponent.onOpen('notification')"/>
      <NuxtLink
        :to="localePath('/profile')" class="hidden lg:block"
        :class="{ 'text-[var(--primary-color)]': route.path.startsWith(localePath('/profile')) }">
        <UIcon size="1.3rem" name="custom:person"/>
      </NuxtLink>
    </div>

    <UiSlideOver
      :is-open="openComponent.isOpen && openComponent.componentType === 'notification'"
      :title="t('common.notifications')" @close="openComponent.onClose()">
      <UiNotification/>
    </UiSlideOver>
  </nav>
</template>
