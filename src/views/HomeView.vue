<script lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import OrderCard from '@/components/OrderCard.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ContentHeader,
    OrderCard
  },
  methods: {
    ...mapActions({
      fetchOrders: 'order/fetchOrders',
      fetchCategories: 'category/fetchCategories'
    })
  },
  mounted() {
    this.fetchOrders()
    this.fetchCategories()
  },
  computed: {
    ...mapState({
      orders: (state) => state.order.orders,
      categories: (state) => state.category.categories
    })
  }
}
</script>

<template>
  <main>
    <ContentHeader title="Home" class="mb-4" />

    <h2 class="text-2xl mb-4">My order history:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4">
      <OrderCard v-for="(order, index) in orders" :order="order" :categories="categories" />
    </section>
  </main>
</template>
