<script lang="ts" setup>
const { t } = useI18n()

</script>

<template>
  <div class="bg-white mx-auto lg:mx-0 w-full lg:w-1/3 flex flex-col justify-center items-center gap-2 p-4 rounded-md">
    <h2 class="font-semibold text-lg text-center">{{ t('profile.registerPrompt') }}</h2>

    <UButton color="secondary" class="bg-[var(--primary-color)]" :label="t('profile.register')" />

  </div>
</template>