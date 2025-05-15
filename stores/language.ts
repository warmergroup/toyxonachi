import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    lang: 'uz' // Default language is Uzbek
  }),
  actions: {
    setLang(lang: string) {
      this.lang = lang
      localStorage.setItem('selectedLang', lang)
    }
  }
}) 