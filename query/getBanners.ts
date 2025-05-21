// query/getBanners.ts
import { useQuery } from '@tanstack/vue-query'
import $axios from '~/http'

export const useGetBannersQuery = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      const { data } = await $axios.get('/banners/all')
      return data.data.banners
    },

    // // 10 minutdan keyin qayta so'rov yuboradi va keshni yangilaydi
    // staleTime: 1000 * 60 * 10
  })
}