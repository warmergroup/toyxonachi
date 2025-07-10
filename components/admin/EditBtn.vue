<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store'

const { t } = useI18n()
const authStore = useAuthStore()

const props = defineProps<{
    show?: boolean
}>()

const shouldShow = computed(() => {
    return authStore.isAdmin && (props.show !== false)
})
</script>

<template>
    <div v-if="shouldShow"
        class="fixed bottom-0 right-0 md:right-4 w-full md:w-1/4  z-50 flex flex-col gap-4 p-4 bg-white border-t rounded-lg border-gray-200">
        <UButton class="flex items-center justify-center" color="secondary" :label="t('admin.editButton')" />
    </div>
</template>