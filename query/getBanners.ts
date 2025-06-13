export const useGetBannersQuery = () => {
  return useQuery({
    queryKey: ['banners'],
    queryFn: async () => {
      try {
        const {data} = await $axios.get('/banners');
        // Natijalarni tekshirib, xavfsiz qilamiz
        if (data && data.data && Array.isArray(data.data)) {
          // Undefined yoki null elementlarni filtrlash
          return data.data.filter(banner => banner && typeof banner === 'object');
        }
        console.warn('Banner ma\'lumotlari noto\'g\'ri formatda:', data);
        return [];
      } catch (error) {
        console.error('Banner olishda xatolik:', error);
        return [];
      }
    },
  });
};
