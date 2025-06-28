import { useMutation } from "@tanstack/vue-query";
import $authApi from "~/http/authApi";

interface CreateTariffFormData {
    notes: string,
    image_url:string,
    is_active: string,
}

export const useAddDiscount = () => { 
    return useMutation({
        mutationKey: ['add-discounts'],
        mutationFn: async (formData: CreateTariffFormData) => {
            try {
                const response = await $authApi.post('discounts/add', formData);
                return response.data;
            } catch (error: any) {
                // API error handling
                const errorMessage = error.response?.data?.message || "Tarif narxlarini yaratishda mummo bo'ldi";
                throw new Error(errorMessage);
            }
        }
    }); 
}