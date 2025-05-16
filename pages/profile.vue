<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6">{{ t('common.profile') }}</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <div class="w-20 h-20 bg-gray-200 rounded-full"></div>
          <div>
            <h2 class="text-xl font-semibold">{{ t('common.userInfo') }}</h2>
            <p class="text-gray-600">{{ t('common.email') }}: user@example.com</p>
          </div>
        </div>
        <div class="border-t pt-4">
          <h3 class="text-lg font-medium mb-2">{{ t('common.settings') }}</h3>
          <div class="space-y-2">
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              {{ t('common.editProfile') }}
            </button>
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
              {{ t('common.changePassword') }}
            </button>
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-600">
              {{ t('common.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>