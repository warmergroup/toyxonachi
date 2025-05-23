import {useQuery} from '@tanstack/vue-query'
import $axios from '~/http'

export const useGetTariflarQuery = (toyxonaId: string) => {

  return useQuery({
    queryKey: ['get-tariflar', toyxonaId],
    queryFn: async () => {
      try {
        const {data} = await $axios.get('toyxonalar_tariflar/all', {
          params: {
            filter: toyxonaId,
            field: 'toyxona_id',
            start: 0,
          }
        });

        if (data.status && data.data.toyxonalar_tariflar) {
          return data.data.toyxonalar_tariflar;
        }

        throw new Error(data.message || 'Tariflarni yuklashda xatolik yuz berdi');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw new Error('Tariflarni yuklashda xatolik yuz berdi');
      }
    },
  });
}