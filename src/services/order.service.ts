import { axiosInstance } from '@/axios/axios'
import type { IOrder } from '@/types/order.interface'

export const OrderService = {
  async addOrder(data: { comment: string }) {
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
