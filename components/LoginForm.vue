<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">{{ $t('auth.login') }}</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('auth.email') }}</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">{{ $t('auth.password') }}</label>
        <input
          v-model="form.password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <span v-if="loading">{{ $t('common.loading') }}</span>
        <span v-else>{{ $t('auth.login') }}</span>
      </button>
    </form>

    <div class="mt-4 text-center">
      <NuxtLink to="/register" class="text-sm text-primary hover:text-primary-dark">
        {{ $t('auth.noAccount') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await authStore.login({
      email: form.value.email,
      password: form.value.password
    })

    // Muvaffaqiyatli login bo'lganda bosh sahifaga yo'naltirish
    router.push('/')
  } catch (err: any) {
    error.value = err.message || t('auth.loginError')
  } finally {
    loading.value = false
  }
}
</script> 