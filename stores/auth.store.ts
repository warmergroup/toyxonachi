import { defineStore } from 'pinia';
import type { IUser } from '~/interfaces';

interface RegisterData {
    name: string;
    phone: string;
}

interface RegisterResponse {
    user: IUser;
    token: string;
}

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null as IUser | null,
        isAuth: false,
        isLoading: false,
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
            this.user = null;
            this.isAuth = false;
        },
        async register(data: RegisterData) {
            this.setIsLoading(true);
            try {
                const { data: response } = await useFetch<RegisterResponse>('/api/auth/register', {
                    method: 'POST',
                    body: data
                });
                
                if (response.value) {
                    this.setUser(response.value.user);
                    this.setIsAuth(true);
                }
                return response.value;
            } catch (error) {
                console.error('Registration error:', error);
                throw error;
            } finally {
                this.setIsLoading(false);
            }
        }
    },
});