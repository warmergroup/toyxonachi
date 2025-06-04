<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui'

const items = ref<RadioGroupItem[]>([
    {
        label: 'Pro',
        value: 'pro',
        description: 'Tailored for indie hackers, freelancers and solo founders.'
    },
    {
        label: 'Startup',
        value: 'startup',
        description: 'Best suited for small teams, startups and agencies.'
    },
    {
        label: 'Enterprise',
        value: 'enterprise',
        description: 'Ideal for larger teams and organizations.'
    }
])
</script>

<template>
    <URadioGroup color="primary" variant="table" default-value="pro" :items="items" />
</template>
