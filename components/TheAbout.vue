<script setup lang="ts">
const { t } = useI18n();

</script>

<template>
    <div class="space-y-4">
        <NuxtImg src="/aboutImage.png" class="w-full rounded-xl" />
        <p>{{ t('about.description') }}</p>
    </div>
</template>