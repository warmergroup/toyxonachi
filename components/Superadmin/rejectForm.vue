<script setup lang="ts">
const emit = defineEmits(['submit'])
const state = reactive({
    reject_reason: '',
})

function submitForm() {
    emit('submit', state.reject_reason)
}
</script>

<template>
    <div class="flex flex-col pb-10 gap-4">
        <div class="flex flex-col gap-2">
            <span>Sabab kiriting</span>
            <UTextarea v-model="state.reject_reason" variant="soft" class="shadow rounded-lg" autoresize
                placeholder="habaringizni yozing" />
        </div>
        <UButton @click="submitForm" class="flex justify-center rounded-lg" color="secondary" size="xl"
            label="yuborish" />
    </div>
</template>