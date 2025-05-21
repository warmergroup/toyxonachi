import {ref} from 'vue'
import {useLocationStore} from "~/stores/location.store";

const coords = ref<{ latitude: number; longitude: number } | null>(null)
const error = ref<string | null>(null)
const loading = ref(false)

export function useCurrentPosition() {
  const locationStore = useLocationStore()

  function getCurrentPosition() {
    loading.value = true
    if (!navigator.geolocation) {
      error.value = 'Geolokatsiya qo‘llab-quvvatlanmaydi'
      locationStore.setError(error.value)
      loading.value = false
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coords.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        locationStore.setCoords(coords.value)
        loading.value = false
      },
      (err) => {
        error.value = err.message
        locationStore.setError(error.value)
        loading.value = false
      }
    )
  }

  return {coords, error, loading, getCurrentPosition}
}