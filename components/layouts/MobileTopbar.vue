<script lang="ts" setup>
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
</script>
<template>
  <div
    class="container mx-auto fixed top-0 flex justify-between items-center bg-white z-50 w-full h-16 border-b border-gray-300 px-5 py-5">
    <div class="relative w-[90%] md:w-[95%]">
      <input
        type="text" :placeholder="t('common.searchPlaceholder')"
        class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"/>
      <div class="absolute left-3 top-2.5 text-gray-400">
        <Icon name="custom:search"/>
      </div>
    </div>

    <Icon size="1rem" class="text-black" name="custom:bell"/>
  </div>
</template>