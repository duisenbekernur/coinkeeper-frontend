import { axiosInstance } from '@/axios/axios'
import type { IAddOrder, IOrder } from '@/types/order.interface'

export const OrderService = {
  async addOrder(data: IAddOrder) {
    const response = await axiosInstance<IOrder>({
      url: 'orders',
      method: 'POST',
      data
    })

    return response
  },

  async getAll() {
    const response = await axiosInstance<IOrder[]>({
      url: 'orders',
      method: 'GET'
    })

    return response
  }
}
