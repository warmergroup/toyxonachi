<template>
  <nav
    class="container mx-auto fixed bottom-0 flex justify-between items-center bg-white z-50 w-full min-h-16 border-b border-gray-300 px-5 py-3">

    <div class="container mx-auto px-5 flex w-full md:w-3/5 lg:w-fit justify-between items-center gap-5 mb-4">
      <NuxtLink to="/" class="flex flex-col items-center justify-center">
        <UIcon name="custom:home"/>
        <span>Asosiy</span>
      </NuxtLink>
      <NuxtLink to="/" class="flex flex-col items-center justify-center">
        <UIcon name="custom:navbar-search"/>
        <span>To'yxonalar</span>
      </NuxtLink>

      <NuxtLink to="/profile" class="flex flex-col items-center justify-center">
        <UIcon size="1.3rem" class="text-black" name="custom:person"/>
        <span>profile</span>
      </NuxtLink>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>