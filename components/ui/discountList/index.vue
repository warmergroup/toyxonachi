<script lang="ts" setup>
import { getDiscounts } from '~/data'
import type { Banner } from '~/interfaces'

const { formatDate } = useFormat()
const { t } = useI18n();
const { data: banners, isLoading: isBannersLoading } = getDiscounts('admin')

const items = [
    {
        label: t('toyxonaStatus.active'),
        slot: 'active'
    },
    {
        label: t('toyxonaStatus.arxiv'),
        slot: 'archive'
    }
]

const filteredBanners = (slot: string) => {
    if (!banners.value) return [];
    if (slot === 'active') return banners.value.filter((b: Banner) => b.is_active === '1');
    if (slot === 'archive') return banners.value.filter((b: Banner) => b.is_active === '0');
    return [];
};
</script>
<template>
    <div class="flex flex-col gap-4">
        <UTabs :items="items" size="xl" :ui="{
            list: 'bg-gray-200',
            indicator: 'bg-white',
            trigger: 'data-[state=active]:text-default',
            content: '',
            label: 'text-md'
        }">
            <template v-for="tab in items" #[tab.slot]="{ item }">
                <div v-for="banner in filteredBanners(tab.slot)" :key="banner.id"
                    class="bg-white rounded-md p-2 space-y-2">
                    <NuxtImg :src="banner.image_url" loading="lazy"
                        class="w-full aspect-video object-cover rounded-md" />
                    <div class="flex gap-2 items-center">
                        <Icon name="custom:calendar" />
                        <span class="text-sm text-gray-600">{{ formatDate(banner.created_at) }}</span>
                    </div>
                    <div class="w-full flex gap-2 items-center justify-between">
                        <UButton color="neutral" variant="soft" size="xl"
                            class="w-full flex items-center justify-center" label="o'chirish" />
                        <UButton color="warning" variant="soft" size="xl"
                            class="w-full flex items-center justify-center" label="arxivlash" />
                    </div>
                </div>
            </template>
        </UTabs>
    </div>

</template>