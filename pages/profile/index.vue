<script setup>
import { useScreenSize } from '~/hooks/useScreenSize';

const { isLargeScreen } = useScreenSize();

const { t } = useI18n()

</script>
<template>
  <div class="lg:pt-24 container mx-auto flex flex-col gap-4 w-full min-h-[100vh] p-4">
    <h1 class="text-2xl font-bold">{{ t('common.profile') }}</h1>
    <UiRegisterPrompt />
    <MobileProfileSettings v-if="!isLargeScreen" />
  </div>
</template>
