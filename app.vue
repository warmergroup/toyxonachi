<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import { useGetMeQuery } from '~/data/auth';

const { locale } = useI18n()
const { changeLanguage } = useLanguage()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

onMounted(() => {
  const savedLang = localStorage.getItem('selectedLang')

  if (savedLang && savedLang !== locale.value) {
    changeLanguage(savedLang as 'uz' | 'ru' | 'en')
  }

  const token = localStorage.getItem('token')
  if (token) {
    const { refetch } = useGetMeQuery()
    refetch()
  }

})

useHead({
  htmlAttrs: {
    lang,
    dir
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo-splash.svg' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Toyxonachi",
        "url": "https://toyxonachi.uz/"
      })
    }
  ]
})
</script>

<template>
  <div class="h-full w-full bg-[var(--background-color)]">
    <UApp :locale="locales[locale]">
      <div class="container mx-auto w-full min-h-[100vh]" data-vaul-drawer-wrapper>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </UApp>
  </div>
</template>
