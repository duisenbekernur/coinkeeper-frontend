<script setup lang="ts">
import type { IOrder } from '@/types/order.interface'

interface IOrderProps {
  order: IOrder
}

const { order } = defineProps<IOrderProps>()
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <p class="text-2xl">{{ order.comment }}</p>
      <div>
        <p class="text-xl">{{ order.amount }} ₸</p>
        <span class="text-xl text-red-600">{{ order.cardName }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>
