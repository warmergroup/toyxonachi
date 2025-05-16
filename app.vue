<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguage } from '~/hooks/useLanguage'

const { locale } = useI18n()
const { changeLanguage } = useLanguage()
const isLoading = ref(true)

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

onMounted(() => {
  const savedLang = localStorage.getItem('selectedLang')
  if (savedLang && savedLang !== locale.value) {
    changeLanguage(savedLang as 'uz' | 'ru' | 'en')
  }

  // Sahifa yuklanishini tekshirish
  if (document.readyState === 'complete') {
    isLoading.value = false
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      isLoading.value = false
    })
  }
})

useHead({
  htmlAttrs: {
    lang,
    dir
  }
})
</script>

<template>
  <div class="container mx-auto w-full bg-[var(--background-color)]">
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
    </div>
    <UApp :locale="locales[locale]">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
