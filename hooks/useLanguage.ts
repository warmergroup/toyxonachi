import {useI18n} from 'vue-i18n'
import {useLanguageStore} from '~/stores/language'
import {useRouter} from 'vue-router'

type Language = 'uz' | 'ru' | 'en'

export const useLanguage = () => {
  const {setLocale} = useI18n()
  const langStore = useLanguageStore()
  const router = useRouter()

  const changeLanguage = async (lang: Language) => {
    try {
      // Joriy scroll pozitsiyasini saqlab qolish
      const scrollPosition = window.scrollY
      
      await setLocale(lang)
      langStore.setLang(lang)
      localStorage.setItem('selectedLang', lang)
      
      const currentRoute = router.currentRoute.value
      const newPath = currentRoute.fullPath.replace(/^\/[a-z]{2}/, `/${lang}`)
      
      // Router navigation tugagandan keyin scroll pozitsiyasini tiklash
      await router.replace({
        path: newPath,
        query: currentRoute.query,
        hash: currentRoute.hash
      })

      // Keyingi tick da scroll pozitsiyasini tiklash
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'instant'
        })
      })
    } catch (error) {
      console.error(`Tilni o'zgartirishda xatolik:`, error)
    }
  }

  return {
    changeLanguage
  }
} 