import {useInfiniteQuery, useQuery} from '@tanstack/vue-query';
import $axios from "~/http";

import {useToyxonalarStore} from "~/stores/toyxonalar.store";

export const useGetToyxonalarQuery = (currentPage: number, itemsPerpage: number) => {
  const toyxonalarStore = useToyxonalarStore();
  return useQuery({
    queryKey: ['get-toyxonalar', currentPage],
    queryFn: async () => {
      try {
        const {data} = await $axios.get('toyxonalar/all', {
          params: {
            filter: '',
            field: '',
            start: currentPage,
            limit: itemsPerpage
          }
        });
        if (data.status && data.data.toyxonalar) {
          toyxonalarStore.setToyxonalar(data.data.toyxonalar);
          return data.data;
        }
        throw new Error(data.message || 'To\'yxonalarni yuklashda xatolik yuz berdi');
      } catch (error) {
        throw new Error('To\'yxonalarni yuklashda xatolik yuz berdi');
      }
    },
  });
};

export const useInfiniteToyxonalarQuery = (itemsPerPage = 12) => {
  return useInfiniteQuery({
    queryKey: ['venues-infinite'],
    queryFn: async ({pageParam = 0}) => {
      const {data} = await $axios.get('toyxonalar/all', {
        params: {
          filter: '',
          field: '',
          start: pageParam,
          limit: itemsPerPage
        }
      })
      if (data.status && data.data.toyxonalar) {
        return data.data.toyxonalar
      }
      return []
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < itemsPerPage) return undefined
      return allPages.flat().length
    },
    initialPageParam: 0,
  })
}