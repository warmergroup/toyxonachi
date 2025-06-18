import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';

export const useLogout = () => {
    const toast = useToast();
    const {t} = useI18n();
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const { data } = await $authApi.post('logout');
            return data;
        },
        onSuccess: () => {
            const authStore = useAuthStore();
            authStore.setUser(null);
            localStorage.removeItem('token');
            toast.add({
                title: 'Chiqish',
                description: 'Siz tizimdan chiqdingiz',
                color: 'warning',
                icon: 'i-heroicons-check-circle-20-solid',
            });
        },
        onError: (error: Error) => {
            console.error('Logout error:', error);
            const toast = useToast();
            toast.add({
                title: 'Xatolik',
                description: error.message || 'Chiqishda xatolik yuz berdi',
                color: 'error',
                icon: 'i-heroicons-x-mark-20-solid',
            });
        }
    });
};