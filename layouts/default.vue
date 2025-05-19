<script setup lang="ts">
import { useScreenSize } from '~/hooks/useScreenSize'
const { isLargeScreen } = useScreenSize()
</script>
<template>
  <div class="">
    <LayoutsNavbar v-if="isLargeScreen" />
    <LayoutsMobileTopbar v-else class="lg:hidden" />
    <section class="px-5 pt-20 pb-24">
      <slot />
    </section>
    <LayoutsMobileNavbar v-if="!isLargeScreen" class="lg:hidden" />
  </div>
</template>
