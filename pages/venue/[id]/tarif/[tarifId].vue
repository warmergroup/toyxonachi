<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useI18n} from "vue-i18n";
import {useGetTarifDetailQuery} from "~/api/getTarifDetail"

const route = useRoute()
const {t} = useI18n()

// tarifId dinamik parametrlardan olinadi
const {data: tarif, isLoading, isError} = useGetTarifDetailQuery(route.params.tarifId as string)
</script>

<template>
  <div>
    <div v-if="isLoading">Yuklanmoqda...</div>
    <div v-else-if="isError">Xatolik yuz berdi</div>
    <div v-else-if="tarif">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Tarif tafsilotlari -->
        <div class="lg:col-span-1 bg-white rounded-xl shadow p-6">
          <h2 class="text-xl font-bold mb-4">{{ tarif.name }}</h2>
          <div class="flex items-center justify-between">
            <div class="">{{ tarif.people_count }} {{ t('venue.people') }}</div>
            <div class="">{{ tarif.total_price }} so'm</div>
          </div>
          <!-- Qo'shimcha info -->
        </div>
        <!-- Ovqatlar va tablar -->
        <div class="lg:col-span-3">
          <!-- Tablar (kategoriya bo'yicha) -->
          <!--          <div class="flex gap-2 mb-4">-->
          <!--            <button v-for="cat in categories" :key="cat" ...>{{ cat }}</button>-->
          <!--          </div>-->
          <!--          &lt;!&ndash; Ovqatlar grid &ndash;&gt;-->
          <!--          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">-->
          <!--            <div v-for="food in filteredFoods" :key="food.name" class="bg-white rounded-xl p-3 shadow">-->
          <!--              <img :src="food.image" class="w-full h-32 object-cover rounded mb-2" />-->
          <!--              <div class="font-semibold">{{ food.name }}</div>-->
          <!--              <div class="text-gray-500 text-sm">{{ food.description }}</div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <div v-else>
      Tarif topilmadi.
    </div>
  </div>
</template>