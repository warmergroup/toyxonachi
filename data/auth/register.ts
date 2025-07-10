import { useMutation } from '@tanstack/vue-query';
import { getToken, messaging } from '~/utils/firebase';
import $axios from '~/http';
import type { IRegisterResponse } from '~/interfaces';

interface RegisterFormData {
  name: string;
  phone: string;
  status: string;
  role: number;
}

export const useRegister = (vapidKey: string) => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (formData: RegisterFormData) => {
      let fcmToken = null;
      if (messaging) {
        try {
          fcmToken = await getToken(messaging, { vapidKey });
        } catch (err) {
          console.warn('FCM token olishda xatolik:', err);
        }
      }
      const payload = { ...formData, fcm_token: fcmToken };
      try {
        const response = await $axios.post<IRegisterResponse>('register', payload);
        return response.data;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMessage);
      }
    }
  });
};