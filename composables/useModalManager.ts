import { ref, type Ref } from 'vue'

type ModalType =
  | 'changeLanguage'
  | 'editProfile'
  | 'auth'
  | 'about'
  | 'adminToyxonalar'
  | 'allVenues'
  | 'discounts'
  | 'addDiscount'
  | 'admins'
  | 'addAdmin'
  | 'addToyxona'
  | 'createTariff'
  | 'toyxAction'

interface ModalPayload {
  props?: Record<string, any>
  onResult?: (result: unknown) => void
}

export function useModalManager() {
  const isOpen = ref(false)
  const componentType = ref<ModalType | null>(null)
  const payload = ref<ModalPayload>({})

  function open(
    type: ModalType,
    data: ModalPayload = {}
  ) {
    componentType.value = type
    payload.value = data
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    componentType.value = null
    payload.value = {}
  }

  return { isOpen, componentType, payload, open, close }
}