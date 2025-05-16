<script setup>

const { t } = useI18n();

</script>

<template>
  <nav
    class="container mx-auto fixed top-0 flex justify-between items-center bg-white z-50 w-full h-16 border-b border-gray-300 px-5 py-5">
    <NuxtLink to="/" class="hidden md:block">
      <h1 class="text-2xl font-bold">To'yxonachi</h1>
    </NuxtLink>

    <div class="flex w-full md:w-3/5 lg:w-fit justify-between items-center gap-5">
      <NuxtLink to="/" class="hidden lg:flex justify-between items-center gap-1">
        <UIcon name="custom:home" />
        <span>{{ t('common.main') }}</span>
      </NuxtLink>
      <NuxtLink to="/" class="hidden lg:flex justify-between items-center gap-1">
        <UIcon name="custom:navbar-search" />
        <span>{{ t('common.venues') }}</span>
      </NuxtLink>

      <div class="relative w-[90%] md:w-full lg:w-fit">
        <input type="text" :placeholder="t('common.searchPlaceholder')"
          class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400" />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <Icon name="custom:search" />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center gap-5 ">
      <UiLangSwitcher />
      <div class="">
        <Icon size="1rem" class="text-black" name="custom:bell" />
      </div>
      <NuxtLink to="/profile" class="hidden lg:block">
        <UIcon size="1.3rem" class="text-black" name="custom:person" />
      </NuxtLink>
    </div>
  </nav>
</template>
