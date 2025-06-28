<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store'
const authStore = useAuthStore()
const emit = defineEmits(['reject', 'accept'])

function acceptVenue() {
    emit('accept')
}
function rejectVenue() {
    emit('reject')
}
</script>

<template>
    <div v-if="authStore.isSuperAdmin"
        class="fixed bottom-0 right-0 md:right-4 w-full md:w-1/4  z-50 flex flex-col gap-4 p-4 bg-white border-t border-gray-200">
        <UButton class="flex items-center justify-center" color="secondary" @click="acceptVenue">Qabul qilish</UButton>
        <UButton class="flex items-center justify-center" variant="soft" color="error" @click="rejectVenue">Rad etish
        </UButton>
    </div>
</template>