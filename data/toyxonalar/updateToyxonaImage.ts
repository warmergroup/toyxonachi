import { useMutation } from "@tanstack/vue-query";
import $authApi from "~/http/authApi";

export const useUpdateToyxonaImage = () => {
    return useMutation({
        mutationKey: ["update-toyxonaImage"]
    })
}