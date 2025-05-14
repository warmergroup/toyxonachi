import {useQuery} from '@tanstack/vue-query';
import $axios from "~/http";

import {useToyxonalarStore} from "~/stores/toyxonalar.store";

export const useGetToyxonalarQuery = (currentPage: number, itemsPerpage: number) => {
  const toyxonalarStore = useToyxonalarStore();
  return useQuery({
    queryKey: ['get-toyxonalar', currentPage],
    queryFn: async () => {
      const {data} = await $axios.get('toyxonalar/all', {
        params: {
          filter: '',
          field: '',
          start: currentPage,
          limit: itemsPerpage
        }
      });
      toyxonalarStore.setToyxonalar(data);
      return data;
    },
  });
};