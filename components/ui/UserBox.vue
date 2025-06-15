<template>
  <div class="flex items-center justify-between rounded-md bg-white p-4">
    <div class="flex items-center gap-4">
      <NuxtImg src="/userImage.png" loading="lazy" alt="User Avatar" class="w-16 h-16 rounded-full"/>
      <div class="flex flex-col gap-1.5">
        <h2 class="text-lg font-semibold">Xasanov Akbarali</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">+998 90 123 45 67</p>
        <span class="bg-[var(--success-color)] py-1.5 px-3 rounded-full text-white text-sm">
                    status: Foydalanuvchi
                </span>
      </div>
    </div>
    <Icon size="15px" name="custom:chevron-right"/>
  </div>
</template>