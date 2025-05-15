import { useQuery } from "@tanstack/vue-query";
import $axios from "~/http";
import { useBannerStore } from "~/stores/banner.store";

export const useGetBannersQuery = () => {
    const bannerStore = useBannerStore();
    return useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const {data} = await $axios.get('/banners/all');
            bannerStore.setBanners(data.data);
            bannerStore.setLoading(false);
            return data.data;
        }
    })
}
