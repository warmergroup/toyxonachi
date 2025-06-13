<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.store';
import { ref, computed } from 'vue';

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const form = ref({
    name: '',
    phone: '',
});

const phonePrefix = '+998';

const errors = ref({
    name: '',
    phone: ''
});

// Telefon raqamini formatlab ko'rsatish
const formattedPhone = computed(() => {
    const phone = form.value.phone;
    if (!phone) return '';

    const parts = [];
    let current = 0;

    // Operator kodi (2 raqam)
    if (phone.length > 0) {
        parts.push(phone.slice(0, Math.min(2, phone.length)));
        current = 2;
    }

    // O'rta raqamlar (3 raqam)
    if (phone.length > 2) {
        parts.push(phone.slice(current, Math.min(current + 3, phone.length)));
        current += 3;
    }

    // Keyingi 2 raqam
    if (phone.length > 5) {
        parts.push(phone.slice(current, Math.min(current + 2, phone.length)));
        current += 2;
    }

    // Oxirgi 2 raqam
    if (phone.length > 7) {
        parts.push(phone.slice(current));
    }

    return parts.join(' ');
});

const validateForm = () => {
    let isValid = true;
    errors.value.name = '';
    errors.value.phone = '';

    if (!form.value.name.trim()) {
        errors.value.name = t('validation.nameRequired');
        isValid = false;
    }

    if (!form.value.phone.trim()) {
        errors.value.phone = t('validation.phoneRequired');
        isValid = false;
    } else if (!/^\d{9}$/.test(form.value.phone)) {
        errors.value.phone = t('validation.phoneInvalid');
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        await authStore.register({
            name: form.value.name,
            phone: phonePrefix + form.value.phone // Raqamni to'liq formatda yuborish
        });
        router.push('/profile');
    } catch (error) {
        console.error('Registration error:', error);
    }
};

const handlePhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    // Faqat raqamlarni qoldirish
    const numbers = input.value.replace(/\D/g, '');
    form.value.phone = numbers.slice(0, 9); // Maximum 9 raqam
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
        <!-- FIO -->
        <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-medium text-gray-700">{{ t('profile.name') }}</label>
            <input type="text" id="name" v-model="form.name"
                class="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                :placeholder="t('profile.namePlaceholder')" />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>

        <!-- Telefon raqami -->
        <div class="flex flex-col gap-2">
            <label for="phone" class="text-sm font-medium text-gray-700">{{ t('profile.phone') }}</label>
            <div class="relative flex items-center">
                <span class="absolute left-4 text-gray-500">{{ phonePrefix }}</span>
                <input type="tel" id="phone" :value="formattedPhone" @input="handlePhoneInput"
                    class="pl-16 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="88 990 41 51" />
            </div>
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
        </div>

        <!-- Submit button -->
        <UiMainButton type="submit" :label="t('profile.register')" class="w-full mt-2" />
    </form>
</template>