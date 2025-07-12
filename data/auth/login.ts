import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
import type { ILoginResponse } from '~/interfaces';
import { getFCMToken } from '~/utils/firebase';

interface LoginFormData {
    phone: string;
}

export const useLogin = (vapidKey?: string) => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (formData: LoginFormData) => {
            // FCM token olish (faqat client-side'da)
            const fcmToken = process.client ? await getFCMToken(vapidKey) : null;
            
            const payload = { ...formData, fcm_token: fcmToken };
            try {
                const { data } = await $authApi.post<ILoginResponse>('login', payload);
                return data;
            } catch (error: any) {
                // API error handling
                const errorMessage = error.response?.data?.message || 'Login failed';
                throw new Error(errorMessage);
            }
        }
    });
};
