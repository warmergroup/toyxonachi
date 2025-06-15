import { ref } from 'vue'
import type { IToyxonalar } from '~/interfaces'

export function useToyxonaCache() {
    const cachedToyxona = ref<Map<string, IToyxonalar>>(new Map())

    const cacheToyxona = (toyxona: IToyxonalar) => {
        cachedToyxona.value.set(String(toyxona.id), toyxona)
    }

    const getCachedToyxona = (id: string): IToyxonalar | undefined => {
        return cachedToyxona.value.get(String(id))
    }

    const clearCache = () => {
        cachedToyxona.value.clear()
    }

    return {
        cacheToyxona,
        getCachedToyxona,
        clearCache
    }
}
