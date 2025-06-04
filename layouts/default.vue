<script setup lang="ts">
import { useScreenSize } from '~/hooks/useScreenSize';

const { isLargeScreen } = useScreenSize();

</script>

<template>
  <div class="">
    <LayoutsNavbar v-if="isLargeScreen" />
    <section class="pb-24">
      <slot />
    </section>
    <LayoutsMobileNavbar v-if="!isLargeScreen" class="lg:hidden" />
  </div>
</template>
