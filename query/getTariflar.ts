import {useQuery} from '@tanstack/vue-query'
import $axios from '~/http'

export const useGetTariflarQuery = (toyxonaId: string) => {
  console.log("Toyxona ID: ", toyxonaId);
  return useQuery({
    queryKey: ['get-tariflar', toyxonaId],
    queryFn: async () => {
      try {
        const { data } = await $axios.get('toyxonalar_tariflar/all', {
          params: {
            filter: toyxonaId,
            field: 'toyxona_id',
            start: 0,
          },
        });
        console.log("Tariflar data: ", data);

        // Tariflarni to'g'ri qaytarish
        if (data.status && Array.isArray(data.data)) {
          console.log("Barcha tariflar: ", data);
          return data.data; // `data.data` massivni qaytaradi
        }

        throw new Error(data.message || 'Tariflarni yuklashda xatolik yuz berdi');
      } catch (error) {
        throw new Error('Tariflarni yuklashda xatolik yuz berdi');
      }
    },
  });
};