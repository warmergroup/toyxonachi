<template>
    <nav class="navbar">
        <div class="container">
            <!-- Boshqa navbar elementlari -->
            <LangSwitcher />
        </div>
    </nav>
</template>

<script setup>
import LangSwitcher from '~/components/ui/LangSwitcher.vue'
</script>

<style scoped>
.navbar {
    @apply fixed top-0 left-0 right-0 z-50 bg-white shadow-sm;
}
</style>