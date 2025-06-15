<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const { changeLanguage } = useLanguage()

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
  <div class="h-full w-full bg-[var(--background-color)]">
    <UApp :locale="locales[locale]">
      <div class="container mx-auto w-full min-h-[100vh] " data-vaul-drawer-wrapper>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </UApp>
  </div>
</template>
