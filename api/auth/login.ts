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
            const { data } = await $authApi.post<ILoginResponse>('login', formData);
            return data;
        }
    });
};
