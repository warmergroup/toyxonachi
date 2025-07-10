import {defineStore} from 'pinia'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    lang: 'uz'
  }),
  actions: {
    setLang(lang: string) {
      this.lang = lang
      localStorage.setItem('selectedLang', lang)
    },
    getLang() {
      const storedLang = localStorage.getItem('selectedLang')
      if (storedLang) {
        this.lang = storedLang
      }
      return this.lang
    }
  }
}) 