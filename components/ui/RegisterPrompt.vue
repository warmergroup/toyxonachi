<script lang="ts" setup>
const {t} = useI18n()

</script>

<template>
  <div class="bg-white mx-auto w-[356px] flex flex-col justify-center items-center gap-2 p-4 rounded-md">
    <h2 class="font-semibold text-lg">{{ t('auth.registerPrompt') }}</h2>

    <UButton color="secondary" class="bg-[var(--primary-color)]" :label="t('auth.register')"/>

  </div>
</template>