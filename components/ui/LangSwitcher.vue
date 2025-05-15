<script setup lang="ts">
import type {DropdownMenuItem} from '@nuxt/ui'
import {useLanguageStore} from '~/stores/language'

type Locale = 'uz' | 'ru' | 'en'

const {locale} = useI18n()
const router = useRouter()
const langStore = useLanguageStore()

const currentLocale = computed(() => langStore.lang)

const items = computed<DropdownMenuItem[]>(() => [
  [
    {
      icon: 'i-custom:ru-flag',
      click: () => switchLanguage('ru')
    },
    {
      icon: 'i-custom:en-flag',
      click: () => switchLanguage('en')
    }
  ]
])

const switchLanguage = (newLocale: Locale) => {
  langStore.setLang(newLocale)
  locale.value = newLocale as any
  const path = `/${newLocale}${router.currentRoute.value.fullPath.replace(/^\/[a-z]{2}/, '')}`
  router.push(path)
}

// Set initial locale from localStorage if available
onMounted(() => {
  const savedLocale = localStorage.getItem('selectedLang') as Locale
  if (savedLocale && ['uz', 'ru', 'en'].includes(savedLocale)) {
    switchLanguage(savedLocale)
  }
})
</script>

<template>
  <UDropdownMenu
    arrow
    :items="items" :ui="{
    content: 'w-12'
  }">
    <UButton
      :icon="currentLocale === 'uz' ? 'custom:uz-flag' :
      currentLocale === 'ru' ? 'custom:ru-flag' :
        'custom:en-flag'" color="neutral" variant="outline"/>
  </UDropdownMenu>
</template>
