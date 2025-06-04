<script>
import { useScrollHandler } from '~/hooks/useScrollHandler';

</script>

<template>
  <div
    class="fixed top-0 lg:hidden container mx-auto flex justify-between items-center bg-white z-50 w-full border-b rounded-b-2xl border-gray-300 px-5 py-5 transition-transform duration-300">
    <UiSearchPanel />
    <UiNotification />
  </div>
</template>

<style scoped></style>