import { useInfiniteQuery } from '@tanstack/vue-query';
import $axios from "~/http";
import $authApi from '~/http/authApi';

export const useInfiniteToyxonalarQuery = (
    itemsPerPage = 14,
    mode: 'public' | 'admin' = 'public'
  ) => {
  const api = mode === 'admin' ? $authApi : $axios;

    const toyxonalarStore = useToyxonalarStore();
    toyxonalarStore.setLoading(true);
  
    return useInfiniteQuery({
      queryKey: ['venues-infinite', mode],
      queryFn: async ({pageParam = 1}) => {
        try {
          const {data} = await api.get('wedding-halls/all', {
            params: {
              page: pageParam,
              limit: itemsPerPage
            }
          })
          if (data && Array.isArray(data.data)) {
            // a va b uchun tip berish
            data.data.sort((a: { created_at: string }, b: { created_at: string }) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            toyxonalarStore.setLoading(false);
            if (pageParam === 1) {
              toyxonalarStore.setToyxonalar(data.data); // sorted massiv
            } else {
              data.data.forEach((toyxona: any) => {
                toyxonalarStore.addToyxona(toyxona); // har bir yangi element oxiriga qo'shiladi
              });
            }
            
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