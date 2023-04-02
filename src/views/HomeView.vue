<script setup lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import OrderCard from '@/components/OrderCard.vue'
import { onMounted, reactive } from 'vue'
import type { IOrder } from '@/types/order.interface'
import { OrderService } from '@/services/order.service'

const state = reactive<IOrder[]>({
  orders: []
})
// const categories = reactive<ICategory[]>(store.state.categories.categories)
const categories = reactive<{ data: ICategory[] }>({ data: [] })

const getCategories = async () => {
  const response: ICategory[] = await CategoryService.getCategories()
  categories.data = response
}

const getOrders = async () => {
  const { data } = await OrderService.getAll()
  state.orders = data
}

onMounted(() => {
  getCategories()
  getOrders()
})
</script>

<template>
  <main>
    <ContentHeader title="Home" class="mb-4" />

    <h2 class="text-2xl mb-4">My spent history:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4">
      <OrderCard v-for="(order, index) in state.orders" :order="order" />
    </section>
  </main>
</template>
