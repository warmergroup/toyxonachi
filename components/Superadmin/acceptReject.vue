<script setup lang="ts">
    import { useAuthStore } from '~/stores/auth.store'

    const { t } = useI18n()
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
        class="fixed w-full rounded-lg bottom-16 lg:bottom-0 right-[50%] translate-x-[50%] lg:right-4 lg:translate-0 md:w-2/3 lg:w-1/4  z-50 flex flex-col gap-4 p-4 bg-white border-t border-gray-200">
        <UButton class="flex items-center justify-center" color="secondary" @click="acceptVenue"
            :label="t('superadmin.acceptToyxona')" />
        <UButton class="flex items-center justify-center" variant="soft" color="error" @click="rejectVenue"
            :label="t('superadmin.rejectToyxona')" />
    </div>
</template>