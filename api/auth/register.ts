import {useMutation} from '@tanstack/vue-query';
import $axios from '~/http';
import type {IRegisterResponse} from '~/interfaces';

interface RegisterFormData {
  name: string;
  phone: string;
  status: string;
  role: number;
}

export const useRegister = () => {
  const authStore = useAuthStore();
  const toast = useToast();

  return useMutation({
    mutationKey: ['register'],    mutationFn: async (formData: RegisterFormData) => {
      console.log('Sending registration request:', formData);      try {
        const response = await $axios.post<IRegisterResponse>('register', formData);
        console.log('Registration response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('Registration error:', error.response || error);
        throw error;
      }
    },
    onSuccess: (data) => {
      try {
        authStore.setUser({
          id: String(data.user.id),
          name: data.user.name,
          phone: data.user.phone,
          status: data.user.status,
          role: data.role,
        });
        console.log('User registered successfully:', data.user);
        localStorage.setItem('token', data.token);
      } catch (error) {
        console.error('Error processing registration response:', error);
        toast.add({
          title: 'Xatolik',
          description: 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
          color: 'error',
          icon: 'i-heroicons-x-mark-20-solid',
        });
        return; 
      }
    },
    onError: (error: Error) => {
      toast.add({
        title: 'Xatolik',
        description: error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
        color: 'error',
        icon: 'i-heroicons-x-mark-20-solid',
      });
    }
  });
};