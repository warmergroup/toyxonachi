import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
import type { ILoginResponse } from '~/interfaces';

interface LoginFormData {
    phone: string;
}

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (formData: LoginFormData) => {
            try {
                const { data } = await $authApi.post<ILoginResponse>('login', formData);
                return data;
            } catch (error: any) {
                // API error handling
                const errorMessage = error.response?.data?.message || 'Login failed';
                throw new Error(errorMessage);
            }
        }
    });
};
