import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
import { getToken, messaging } from '~/utils/firebase';

interface LogoutResponse {
    message: string;
}

export const useLogout = (vapidKey: string) => {
    const toast = useToast();
    const { t } = useI18n();
    const authStore = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            let fcmToken = null;
            if (messaging) {
                try {
                    fcmToken = await getToken(messaging, { vapidKey });
                } catch (err) {
                    console.warn('FCM token olishda xatolik:', err);
                }
            }
            const { data } = await $authApi.post<LogoutResponse>('users/logout', { fcm_token: fcmToken });
            return data;
        },
        onSuccess: () => {
            // Clear auth store
            authStore.logout();
            // Remove token from localStorage
            localStorage.removeItem('token');
            
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