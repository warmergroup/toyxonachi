import { useBannerStore } from '~/stores/banner.store'

const API_URL = 'http://toyxonachi.uz/api'
const MAX_RETRIES = 3
const TIMEOUT = 5000 // 5 seconds

export const useGetBanner = () => {
    const bannerStore = useBannerStore()

    const fetchBanners = async () => {
        let retries = 0

        while (retries < MAX_RETRIES) {
            try {
                bannerStore.setLoading(true)
                bannerStore.setError(null)

                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

                const response = await fetch(`${API_URL}/banners/all`, {
                    signal: controller.signal
                })

                clearTimeout(timeoutId)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                if (data.status) {
                    bannerStore.setBanners(data.data.banners)
                    return data.data.banners
                } else {
                    throw new Error(data.message || 'Bannerlarni yuklash xatosi')
                }
            } catch (error: any) {
                retries++
                
                if (error.name === 'AbortError') {
                    bannerStore.setError('So\'rov vaqti tugadi')
                } else {
                    bannerStore.setError(error.message || 'Bannerlarni yuklash xatosi')
                }

                if (retries === MAX_RETRIES) {
                    console.error('Bannerlarni yuklash xatosi:', error)
                    // Cache dan yuklash
                    bannerStore.loadBannersFromCache()
                    throw error
                }

                // Retry oldidan kutish
                await new Promise(resolve => setTimeout(resolve, 1000 * retries))
            } finally {
                bannerStore.setLoading(false)
            }
        }
    }

    return {
        fetchBanners
    }
} 