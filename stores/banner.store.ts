import { defineStore } from 'pinia'
import type { Banner } from '~/interfaces'

interface BannerState {
    banners: Banner[]
    isLoading: boolean
    error: string | null
}

export const useBannerStore = defineStore('bannerStore', {
    state: (): BannerState => ({
        banners: [],
        isLoading: false,
        error: null
    }),

    getters: {
        // Barcha bannerlarni olish
        getAllBanners: (state) => state.banners,

        // Bannerlarni vaqt bo'yicha saralash (yangi -> eski)
        getSortedBanners: (state) => {
            return [...state.banners].sort((a, b) => 
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
        },

        // Bannerlarni nomi bo'yicha qidirish
        getBannersByName: (state) => (searchTerm: string) => {
            return state.banners.filter(banner => 
                banner.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
    },

    actions: {
        setBanners(banners: Banner[]) {
            this.banners = banners
            // Keshlashtirish
            localStorage.setItem('banners', JSON.stringify(banners))
        },

        setLoading(value: boolean) {
            this.isLoading = value
        },

        setError(error: string | null) {
            this.error = error
        },

        // Cache dan bannerlarni yuklash
        loadBannersFromCache() {
            const cachedBanners = localStorage.getItem('banners')
            if (cachedBanners) {
                this.banners = JSON.parse(cachedBanners)
            }
        },

        // Bannerlarni tozalash
        clearBanners() {
            this.banners = []
            this.error = null
            localStorage.removeItem('banners')
        }
    }
})
