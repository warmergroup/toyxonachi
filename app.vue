<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import {computed, onMounted} from 'vue'
import {useI18n} from 'vue-i18n'
import {useLanguage} from '~/hooks/useLanguage'

const {t, locale} = useI18n()
const {changeLanguage} = useLanguage()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

onMounted(() => {
  const savedLang = localStorage.getItem('selectedLang')
  if (savedLang && savedLang !== locale.value) {
    changeLanguage(savedLang as 'uz' | 'ru' | 'en')
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
    <UApp :locale="locales[locale]">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UApp>
  </div>
</template>
