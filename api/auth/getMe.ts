import $authApi from '~/http/authApi';
import {useQuery} from "@tanstack/vue-query";
import type {IUser} from '~/interfaces';

export const useGetMeQuery = () => {
  const authStore = useAuthStore();
  return useQuery({
    queryKey: ['get-me'],
    queryFn: async () => {
      const {data} = await $authApi.get<IUser>('users/me');
      if (!data) {
        throw new Error('User data not found');
      }
      authStore.setUser(data);
      console.log("getMe data: ", data)
      return data;
    }
  });
};