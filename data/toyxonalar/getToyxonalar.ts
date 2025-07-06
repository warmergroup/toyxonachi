import {useQuery} from '@tanstack/vue-query';
import $axios from "~/http";

export const useGetToyxonalarQuery = (currentPage: number, itemsPerpage: number, price: boolean) => {
  const toyxonalarStore = useToyxonalarStore();
  return useQuery({
    queryKey: ['get-toyxonalar', currentPage],
    queryFn: async () => {
      try {
        const {data} = await $axios.get('wedding-halls/all', {
          params: {
            price: price,
            start: currentPage,
            limit: itemsPerpage
          }
        });
        console.log("getToyxonalar response: ", data.data)
       
        return data.data;
      } catch (error: any) {
        throw new Error('To\'yxonalarni yuklashda xatolik yuz berdi', error);
      }
    },
  });
};