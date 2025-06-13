import {useQuery} from '@tanstack/vue-query'
import $axios from '~/http'

export const useGetTariflarQuery = (wedding_hall_id: string) => {
  return useQuery({
    queryKey: ['get-tariflar', wedding_hall_id],
    queryFn: async () => {
      try {
        const {data} = await $axios.get(`tariffs/${wedding_hall_id}`);
        // console.log("Tariflar data: ", data);

        // Tariflarni to'g'ri qaytarish
        if (data.status && Array.isArray(data.data)) {
          // console.log("Barcha tariflar: ", data);
          return data.data; // `data.data` massivni qaytaradi
        }

        throw new Error(data.message || 'Tariflarni yuklashda xatolik yuz berdi');
      } catch (error) {
        throw new Error('Tariflarni yuklashda xatolik yuz berdi');
      }
    },
  });
};