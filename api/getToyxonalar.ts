import {useInfiniteQuery, useQuery} from '@tanstack/vue-query';
import $axios from "~/http";

import {useToyxonalarStore} from "~/stores/toyxonalar.store";

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

export const useInfiniteToyxonalarQuery = (itemsPerPage = 12) => {
  const toyxonalarStore = useToyxonalarStore();

  toyxonalarStore.setLoading(true);

  return useInfiniteQuery({
    queryKey: ['venues-infinite'],
    queryFn: async ({pageParam = 1}) => {
      try {
        const {data} = await $axios.get('wedding-halls/all', {
          params: {
            page: pageParam,
            per_page: itemsPerPage
          }
        })
        if (data && Array.isArray(data.data)) {
          toyxonalarStore.setLoading(false);
          if (pageParam === 1) {
            toyxonalarStore.setToyxonalar(data.data);
          } else {
            data.data.forEach((toyxona: any) => {
              toyxonalarStore.addToyxona(toyxona);
            });
          }
          // console.log("Toyxonalar ma'lumoti: ", data.data)
          return data.data;
        }
        toyxonalarStore.setLoading(false);
        return [];
      } catch (error: any) {
        console.error('Toyxonalarni yuklashda xatolik:', error);
        toyxonalarStore.setLoading(false);
        toyxonalarStore.setError(error instanceof Error ? error : new Error(error?.message || 'Toyxonalarni yuklashda xatolik'));
        throw error; // Xatoni qaytaramiz toki useInfiniteQuery uni tutib olsin
      }
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage || lastPage.length < itemsPerPage) return undefined;
      return lastPageParam + 1;
    },
    initialPageParam: 1,
  });
}