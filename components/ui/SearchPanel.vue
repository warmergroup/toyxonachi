<script lang="ts" setup>
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
</script>
<template>
  <div class="relative w-[90%] md:w-[95%]">
    <input
      type="text" :placeholder="t('common.searchPlaceholder')"
      class="w-full pl-10 pr-8 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400">
    <div class="absolute left-3 top-2.5 text-gray-400">
      <Icon name="custom:search"/>
    </div>
  </div>
</template>