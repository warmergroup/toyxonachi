<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false); // Panel ochiq yoki yopiq holatini boshqarish
</script>

<template>
    <div>
        <!-- Notification tugmasi -->
        <Icon class="text-black cursor-pointer" name="custom:bell" @click="open = true" />

        <!-- NotificationPanel -->
        <UiNotificationPanel v-model:modelValue="open" />
    </div>
</template>