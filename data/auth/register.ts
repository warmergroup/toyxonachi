import { useMutation } from '@tanstack/vue-query';
import { requestFcmToken } from '~/composables/useFCM'
import $axios from '~/http';
import type { IRegisterResponse } from '~/interfaces';

interface RegisterFormData {
  name: string;
  phone: string;
  status: string;
  role: number;
}

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (formData: RegisterFormData) => {
      try {
        const response = await $axios.post<IRegisterResponse>('register', formData);
        return response.data;
      } catch (error: any) {
        // API error handling
        const errorMessage = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMessage);
      }
    }
  });
};