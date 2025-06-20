<script setup lang="ts">
import { openState } from '~/stores/isOpen.store';
import { PROFILE_ACTIONS } from '~/constants/profileActions';
import type { IProfileAction, ComponentType } from '~/interfaces';

const { isLargeScreen } = useScreenSize();
console.log('isLargeScreen:', isLargeScreen.value); // Add this line to debug
const { t } = useI18n();
const openComponent = openState();

// Define valid user roles
type UserRole = 'user' | 'admin' | 'superadmin' | undefined;

const props = defineProps<{
    role?: UserRole;
}>();

// Computed property to filter and sort actions based on role and device type
const sortedActions = computed(() => {
    const filtered = PROFILE_ACTIONS.filter(action => {
        // Special handling for always-visible actions
        const isAlwaysVisible = action.id === 'about' || action.id === 'changeLanguage';
        if (isAlwaysVisible) {
            // Show language change on mobile only (!isLargeScreen)
            if (action.id === 'changeLanguage') {
                return !isLargeScreen.value; // true on mobile, false on desktop
            }
            return true; // 'about' is always visible
        }

        // Show role-based actions only if user has the required role
        return props.role ? action.roles.includes(props.role) : false;
    });

    // Sort to ensure 'about' action is always last
    return filtered.sort((a, b) => {
        if (a.id === 'about') return 1;  // Move 'about' to the end
        if (b.id === 'about') return -1; // Move 'about' to the end
        return 0;  // Keep original order for other items
    });
});
</script>

<template>
    <div class="flex flex-col gap-4 rounded-md bg-white p-4">
        <template v-for="(action, index) in sortedActions" :key="action.id">
            <div v-if="index > 0">
                <USeparator />
            </div>
            <div class="flex items-center justify-between cursor-pointer"
                @click="openComponent.onOpen(action.component)">
                <div class="flex items-center gap-2">
                    <span class="flex w-[40px] h-[40px] items-center justify-center rounded-full bg-slate-200/40">
                        <Icon class="text-[var(--primary-color)]" size="22px" :name="`custom:${action.icon}`" />
                    </span>
                    <p class="text-black text-base font-medium">{{ t(action.label) }}</p>
                </div>
                <Icon size="15px" name="custom:chevron-right" />
            </div>
        </template>
    </div>
</template>