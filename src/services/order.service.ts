import { axiosInstance } from '@/axios/axios'
import type { IAddOrder, IOrder, IOrderUpdate } from '@/types/order.interface'

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
  },
  async deleteOrder(id: number, cardId) {
    const data = { cardId }

    const response = await axiosInstance({
      url: `orders/${id}`,
      method: 'DELETE',
      data
    })

    return response
  },
  async updateOrder(id: number, data: IOrderUpdate) {
    const response = await axiosInstance<IOrder>({
      url: `orders/${id}`,
      method: 'PUT',
      data
    })

    console.log(response)

    return response
  }
}
