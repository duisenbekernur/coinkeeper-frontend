import type { Module } from 'vuex'
import type { RootState } from '@/store/types'
import type { IOrder, IAddOrder, IOrderUpdate } from '@/types/order.interface'
import { OrderService } from '@/services/order.service'

export interface OrdersState {
  orders: IOrder[]
}

const categoriesModule: Module<CategoriesState, RootState> = {
  namespaced: true,
  state: {
    orders: [] as IOrder[],
    totalSpent: 0 as number
  },
  mutations: {
    setOrders(state, orders: IOrder[]) {
      state.orders = orders
    },
    addOrder(state, order: IOrder) {
      state.orders.push(order)
    },
    calcTotalSpent(state) {
      state.totalSpent = state.orders.reduce((acc, cur) => acc + cur.amount, 0)
    },
    deleteOrder(state, id: number) {
      state.orders = state.orders.filter((order) => order.id !== id)
    }
  },
  actions: {
    async fetchOrders({ commit }) {
      const { data }: IOrder[] = await OrderService.getAll()
      commit('setOrders', data)
    },
    async addOrder({ commit }, order: IAddOrder) {
      const { data } = await OrderService.addOrder(order)
      commit('addOrder', data)
    },
    async deleteOrder({ commit }, dto) {
      const { data } = await OrderService.deleteOrder(dto.id, dto.cardId)
      commit('deleteOrder', dto.id)
      commit('calcTotalSpent')
    },
    async updateOrder({ commit }, dto) {
      const response = await OrderService.updateOrder(dto.id, dto.data)
      commit('deleteOrder', dto.id)
      commit('addOrder', response.data)
      commit('calcTotalSpent')
    }
  },
  getters: {
    getOrders: (state) => state.orders,
    getTotalSpent: (state) => state.totalSpent
  }
}

export default categoriesModule
