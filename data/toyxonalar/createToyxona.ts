import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
import type { ToyxonaFormData } from '~/interfaces';


export const useCreateToyxona = () => { 
    return useMutation({
        mutationKey: ['createToyxona'],
        mutationFn: async (formData: ToyxonaFormData) => {
            try {
                const response = await $authApi.post('wedding-halls/store', formData);
                console.log("respons ichidagi datani ko'rish",response.data)
                return response.data;
            } catch (error: any) {
                // API error handling
                const errorMessage = error.response?.data?.message || 'Toyxona yaratish muvaffaqiyatsiz';
                throw new Error(errorMessage);
            }
        }
    }); 
}