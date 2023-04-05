<script lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import { Icon } from '@iconify/vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import type { ICategory } from '@/types/category.interface'
import HomeCategories from '@/components/HomeCategories.vue'
import UpdateOrderModal from '@/components/UpdateOrderModal.vue'

export default {
  components: {
    ContentHeader,
    Icon,
    HomeCategories,
    UpdateOrderModal
  },
  data() {
    return {
      infoItems: [
        { title: 'Cash balance', icon: 'material-symbols:account-balance-wallet' },
        { title: 'Total spent', icon: 'material-symbols:account-balance-wallet' }
      ],
      orderHeaders: ['COMMENT', 'CATEGORIES', 'AMOUNT', 'CARD', 'DATE', 'ACTION'],
      currentCategories: [] as ICategory[],
      isLoadedCategories: false,
      isLoadedOrders: false,
      isLoadedDelete: true,
      isModalOpened: false
    }
  },
  methods: {
    ...mapActions({
      fetchOrders: 'order/fetchOrders',
      fetchCategories: 'category/fetchCategories',
      fetchTotalBalance: 'card/fetchTotalBalance',
      deleteOrderAction: 'order/deleteOrder'
    }),
    ...mapMutations({
      calcTotalSpent: 'order/calcTotalSpent',
      changeMenu: 'sideMenu/changeMenu'
    }),
    async deleteOrder(id: number) {
      this.isLoadedDelete = false
      await this.deleteOrderAction(id)
      this.isLoadedDelete = true
    }
  },
  computed: {
    ...mapState({
      orders: (state) => state.order.orders,
      categories: (state) => state.category.categories,
      totalBalance: (state) => state.card.totalBalance,
      totalSpent: (state) => state.order.totalSpent
    })
  },
  async created() {
    await this.fetchOrders()
    this.isLoadedOrders = true
    await this.fetchCategories()
    this.isLoadedCategories = true
    await this.fetchTotalBalance()
    this.calcTotalSpent()
  }
}
</script>

<template>
  <main>
    <ContentHeader title="Your dashboard" />

    <div class="flex gap-12 mb-5">
      <div class="flex items-center gap-5 justify-between py-4 px-8 bg-gray-100 rounded-lg">
        <div class="rounded-full bg-gray-700 p-3">
          <Icon width="25" color="#3099E1" :icon="this.infoItems[0].icon" />
        </div>
        <div>
          <h1 class="text-gray-400 font-medium">{{ this.infoItems[0].title }}</h1>
          <p class="font-bold text-2xl">₸{{ totalBalance }}</p>
        </div>
      </div>
      <div class="flex items-center gap-5 justify-between py-4 px-8 bg-gray-100 rounded-lg">
        <div class="rounded-full bg-gray-200 p-3">
          <Icon bg width="25" color="#000" :icon="this.infoItems[1].icon" />
        </div>
        <div>
          <h1 class="text-gray-400 font-medium">{{ this.infoItems[1].title }}</h1>
          <p class="font-bold text-2xl">₸{{ this.totalSpent }}</p>
        </div>
      </div>
    </div>

    <div class="border p-8 rounded-xl">
      <h2 class="text-3xl font-medium mb-4">Last transactions</h2>
      <p v-if="!this.isLoadedOrders" v-loading="!this.isLoadedOrders" class="text-xl"></p>
      <div v-else-if="this.orders.length === 0" class="text-xl">
        <p>
          You don't have any transactions!
          <RouterLink to="/spend" @click="this.changeMenu(2)">
            <span class="font-semibold underline cursor-pointer"
              >Click here to make first transaction!</span
            ></RouterLink
          >
        </p>
      </div>
      <table class="w-full" v-else>
        <thead>
          <tr>
            <th class="text-left py-3 text-gray-400 p-4" v-for="header in this.orderHeaders">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" class="border-b-2 mb-4 items-center" :key="index">
            <td class="font-medium py-7 px-4 text-xl">{{ order.comment }}</td>
            <td class="font-medium p-4 text-xl flex flex-wrap my-auto">
              <HomeCategories
                :categories="this.categories"
                :order="order"
                v-if="this.isLoadedCategories"
              />
              <p v-else>...</p>
            </td>
            <td class="font-medium p-4 text-xl">₸{{ order.amount }}</td>
            <td class="font-medium p-4 text-gray-400">{{ order.cardName }}</td>
            <td class="font-medium p-4 text-gray-400">
              {{ new Date(order.createdAt).toLocaleDateString() }}
            </td>
            <td class="flex gap-4 p-4 font-medium text-black-400">
              <Icon
                width="25"
                icon="mdi:cog-refresh-outline"
                class="cursor-pointer hover:scale-110 transition-all"
                @click="this.isModalOpened = true"
              />
              <Icon
                width="25"
                icon="mdi:delete-outline"
                class="cursor-pointer hover:scale-110 transition-all"
                @click="this.deleteOrder({ id: order.id, cardId: order.cardId })"
              />
              <!-- <img width="20" src="@/assets/img/delete.png" alt="delete"> -->
            </td>

            <UpdateOrderModal
              v-if="this.isModalOpened"
              @closeModal="this.isModalOpened = false"
              :order="order"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
