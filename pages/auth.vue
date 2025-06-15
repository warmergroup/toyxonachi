<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import $axios from "~/http";
import { useAuthStore } from "~/stores/auth.store";

const auth = useAuth();
const authStore = useAuthStore()
const { authState } = storeToRefs(auth);
const router = useRouter();
const isLoading = ref(false);

onMounted(async () => {
  if (localStorage.getItem('accessToken')) {
    try {
      const { data } = await $axios.post('/auth/refresh');
      localStorage.setItem('accessToken', data.accessToken);
      authStore.setUser(data.user);
      authStore.setIsAuth(true);
      await router.push('/');
    } catch {
      // Token yaroqsiz — kirish sahifasi
      isLoading.value = true;
    }
  } else {
    isLoading.value = true;
  }

});
</script>

<template>
  <div v-if="isLoading" class="w-full min-h-[80vh] flex justify-center items-center">
    <UCard class="w-full md:w-1/2 md:p-3 dark:bg-gray-600 bg-gray-100">
      <AuthLogin v-if="authState === 'login'" />
      <AuthRegister v-if="authState === 'register'" />
      <AuthForgotPassword v-if="authState === 'forgot_password'" />
    </UCard>
  </div>
</template>