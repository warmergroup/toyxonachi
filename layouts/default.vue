<script setup lang="ts">
  const isAppLoading = ref(true)

  onMounted(() => {
    isAppLoading.value = false
  })

  const { isLargeScreen } = useScreenSize();
</script>

<template>
  <div v-show="isAppLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500"
    :class="{ 'opacity-0 pointer-events-none': !isAppLoading }">
    <NuxtImg src="/logo-splash.svg" alt="Splash" class="w-32 h-32 animate-pulse" />
  </div>
  <LayoutsNavbar v-if="isLargeScreen" />
  <section>
    <slot />
  </section>
  <LayoutsMobileNavbar v-if="!isLargeScreen" class="lg:hidden" />
</template>
