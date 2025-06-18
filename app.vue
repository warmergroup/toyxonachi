<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import { useGetMeQuery } from '~/data/auth';

const { locale } = useI18n()
const { changeLanguage } = useLanguage()

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

onMounted(() => {
  const savedLang = localStorage.getItem('selectedLang')
  const token = localStorage.getItem('token')

  if (savedLang && savedLang !== locale.value) {
    changeLanguage(savedLang as 'uz' | 'ru' | 'en')
  }

  // Agar token mavjud bo'lsa, foydalanuvchi ma'lumotlarini olamiz
  if (token) {
    const { refetch } = useGetMeQuery()
    refetch()
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
      <div class="container mx-auto w-full min-h-[100vh]" data-vaul-drawer-wrapper>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </UApp>
  </div>
</template>
