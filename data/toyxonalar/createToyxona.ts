import { useMutation } from '@tanstack/vue-query';
import $authApi from '~/http/authApi';
// import type {  } from '~/interfaces';

interface CreateToyxonaFormData { 
    name: string;
    description: string;
    status: string;
    longitude: string;
    latitude: string;
    address: string;
    tariff_count: number;
    phone1: string;
    phone2: string;
    telegram: string;
    instagram: string;
    wedding_hall_pictures: {image_url: string}[];
}

export const useCreateToyxona = () => { 
    return useMutation({
        mutationKey: ['createToyxona'],
        mutationFn: async (formData: CreateToyxonaFormData) => {
        try {
            const response = await $authApi.post('wedding-halls/store', formData);
            return response.data;
        } catch (error: any) {
            // API error handling
            const errorMessage = error.response?.data?.message || 'Toyxona yaratish muvaffaqiyatsiz';
            throw new Error(errorMessage);
        }
        }
    });
}