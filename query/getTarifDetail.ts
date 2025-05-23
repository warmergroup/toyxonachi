import $axios from '~/http';
import {useQuery} from '@tanstack/vue-query'

export const useGetTarifDetailQuery = (tarifId: string) => {
  return useQuery({
    queryKey: ['tarif-detail', tarifId],
    queryFn: async () => {
      const {data} = await $axios(`toyxonalar_tariflar/detail?id=${tarifId}`)
      return data.data.toyxonalar_tariflar
    }
  })
}