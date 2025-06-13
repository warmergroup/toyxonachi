<script setup lang="ts">
import { useScreenSize } from '~/hooks/useScreenSize';

const { isLargeScreen } = useScreenSize();

</script>

<template>
  <div class="">
    <LayoutsNavbar v-if="isLargeScreen" />
    <section>
      <slot />
    </section>
    <LayoutsMobileNavbar v-if="!isLargeScreen" class="lg:hidden" />
  </div>
</template>
