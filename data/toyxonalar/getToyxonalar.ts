import {useQuery} from '@tanstack/vue-query';
import $axios from "~/http";

export const useGetToyxonalarQuery = (currentPage: number, itemsPerpage: number) => {
  const toyxonalarStore = useToyxonalarStore();
  return useQuery({
    queryKey: ['get-toyxonalar', currentPage],
    queryFn: async () => {
      try {
        const {data} = await $axios.get('wedding-halls/all', {
          params: {
            filter: '',
            field: '',
            start: currentPage,
            limit: itemsPerpage
          }
        });
        console.log("getToyxonalar response: ", data)
        // console.log("getToyxonalar data: ", data.data)
        if (data.status && data.data) {
          toyxonalarStore.setToyxonalar(data.data);
          return data.data;
        }
        throw new Error(data.message || 'To\'yxonalarni yuklashda xatolik yuz berdi');
      } catch (error: any) {
        throw new Error('To\'yxonalarni yuklashda xatolik yuz berdi', error);
      }
    },
  });
};