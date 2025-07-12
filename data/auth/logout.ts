import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
import { getFCMToken } from '~/utils/firebase';

interface LogoutResponse {
    message: string;
}

export const useLogout = (vapidKey?: string) => {
    const toast = useToast();
    const { t } = useI18n();
    const authStore = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            // Logout qilganda FCM token yuborish kerak (faqat client-side'da)
            let fcmToken = null;
            if (process.client && vapidKey) {
                fcmToken = await getFCMToken(vapidKey);
            }
            
            const { data } = await $authApi.post<LogoutResponse>('users/logout', { 
                fcm_token: fcmToken 
            });
            return data;
        },
        onSuccess: () => {
            // Clear auth store
            authStore.logout();
            // Remove token from localStorage (faqat client-side'da)
            if (process.client) {
                localStorage.removeItem('token');
                localStorage.removeItem('fcm_token');
            }
            
            // Show success message
            toast.add({
                description: t('logout.successMessage'),
                color: 'success',
            });
            
        },
        onError: (error: any) => {
            console.error('Logout error:', error);
            toast.add({
                title: t('error.title'),
                description: error, 
                color: 'error',
            });
        }
    });
};