import {defineStore} from 'pinia'
import type {IUser} from "~/interfaces";


export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as IUser | null,
    isAuth: false,
    isLoading: true,
  }),
  actions: {
    setUser(user: IUser | null) {
      this.user = user;
    },
    setIsAuth(isAuth: boolean) {
      this.isAuth = isAuth;
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    clearAuthData() {
      this.user = {} as IUser;
      this.isAuth = false;
    },
  },
});