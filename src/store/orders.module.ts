import type { Module } from 'vuex'
import type { RootState } from '@/store/types'
import type { IOrder, IAddOrder } from '@/types/order.interface'
import { OrderService } from '@/services/order.service'

export interface OrdersState {
  orders: IOrder[]
}

const categoriesModule: Module<CategoriesState, RootState> = {
  namespaced: true,
  state: {
    orders: []
  },
  mutations: {
    setOrders(state, orders: IOrder[]) {
      state.orders = orders
    },
    addOrder(state, order: IOrder) {
      state.orders.push(order)
    }
  },
  actions: {
    async fetchOrders({ commit }) {
      const orders: IOrder[] = await OrderService.getAll()
      commit('setOrders', orders.data)
    },
    async addOrder({ commit }, order: IAddOrder) {
      const {data} = await OrderService.addOrder(order)
      commit('addOrder', data)
      alert(data.message)
      
    }
  },
  getters: {
    getOrders: (state) => state.orders
  }
}

export default categoriesModule
