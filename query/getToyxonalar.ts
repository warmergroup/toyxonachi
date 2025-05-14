import {useQuery} from '@tanstack/vue-query';
import {useToyxonalarStore} from "~/stores/toyxonalar.store";
import $axios from "~/http";


export const useGetToyxonalarQuery = (currentPage: any, itemsPerpage: number, totalItems: any) => {
  const toyxonalarStore = useToyxonalarStore();
  return useQuery({
    queryKey: ['get-toyxonalar', currentPage],
    queryFn: async () => {
      const {data} = await $axios.get('toyxonalar/get', {
        params: currentPage.value,
        limit: itemsPerpage,
      });
      toyxonalarStore.setToyxonalar(data);
      console.log("to'yxonalar: ", data);
      return data;
    },
  });
};