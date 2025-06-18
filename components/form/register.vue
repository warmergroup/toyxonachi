<script lang="ts" setup>
import { useRegister } from '~/data';
import { useAuthStore } from '~/stores/auth.store';
import { useRegisterValidation } from '~/composables/useFormValidation';
import { openState } from '~/stores/isOpen.store'
import { vMaska } from 'maska/vue';

const openComponent = openState()
const { t } = useI18n();
const toast = useToast();
const authStore = useAuthStore();

const phonePrefix = '+998';
console.log("user by authStore: ", authStore.user)

const state = reactive({
  name: '',
  phone: '',
});

const fullPhoneNumber = computed(() => phonePrefix + state.phone.replace(/\D/g, ''));

// Registratsiya mutatsiyasi
const { mutate, isPending } = useRegister();

// Forma yuborilganda
const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  console.log('Form submission started');

  if (!state.name || !state.phone) {
    toast.add({
      title: t('error.validation'),
      description: t('error.fillAllFields'),
      color: 'error',
    });
    return;
  }

  const formData = {
    name: state.name.trim(),
    phone: fullPhoneNumber.value,
    status: 'active',
    role: 1,
  };

  console.log('Submitting form data:', formData);

  mutate(
    {
      name: state.name.trim(),
      phone: fullPhoneNumber.value,
      status: 'active',
      role: 1,
    },
    {
      onSuccess: (data) => {
        // Auth store'ga user ma'lumotlarini saqlash
        authStore.setUser(data.user);
        toast.add({
          title: t('success.registered'),
          description: t('success.welcomeMessage', { name: state.name }),
          color: 'success',
        });
        openComponent.onClose();
      },
      onError: (err: any) => {
        toast.add({
          title: t('error.title'),
          description: err?.response?.data?.message || t('error.unknown'),
          color: 'error',
        });
      },
    }
  );
};
</script>

<template>
  <UForm @submit.prevent="onSubmit" :state="state" class="w-full flex flex-col gap-4">
    <!-- Name Field -->
    <UFormField class="w-full" :label="t('form.nameField')" name="name">
      <UInput v-model="state.name" class="w-full" type="text" size="xl" :placeholder="t('form.nameField')"
        color="secondary" :disabled="isPending" />
    </UFormField>

    <!-- Phone Field -->
    <UFormField class="w-full" :label="t('form.phoneField')" name="phone">
      <div class="relative bg-white border border-gray-300 rounded-lg">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {{ phonePrefix }}
        </span>
        <UInput v-model="state.phone" v-maska="'## ### ## ##'" class="pl-20 w-full" size="xl" type="text"
          placeholder="90 123 45 67" color="secondary" :disabled="isPending" />
      </div>
    </UFormField>
    <!-- Submit Button -->
    <button type="submit"
      class="w-full bg-[var(--primary-color)] text-white rounded-lg py-3 text-lg font-semibold transition-colors duration-200">
      {{ t('form.saveButton') }}
    </button>
  </UForm>
</template>
