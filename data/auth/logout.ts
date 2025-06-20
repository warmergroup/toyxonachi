import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';

interface LogoutResponse {
    message: string;
}

export const useLogout = () => {
    const toast = useToast();
    const { t } = useI18n();
    const authStore = useAuthStore();
    const router = useRouter();

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const { data } = await $authApi.post<LogoutResponse>('users/logout');
            return data;
        },
        onSuccess: () => {
            // Clear auth store
            authStore.logout();
            // Remove token from localStorage
            localStorage.removeItem('token');
            
            // Show success message
            toast.add({
                title: t('logout.title'),
                description: t('logout.successMessage'),
                color: 'success',
            });
            
        },
        onError: (error: unknown) => {
            console.error('Logout error:', error);
            toast.add({
                title: t('logout.error'),
                description: t('logout.logoutError'),
                color: 'error',
            });
        }
    });
};