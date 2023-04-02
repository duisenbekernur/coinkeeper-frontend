import { axiosInstance } from '@/axios/axios'
import type { ICard, IFullCard } from '@/types/card.interface'

export const CardService = {
  async getAllCards() {
    const response = await axiosInstance<IFullCard>({
      url: 'bank-card',
      method: 'GET'
    })
    
    return response
  },

  async addCard(data: ICard) {
    const response = await axiosInstance<IFullCard>({
      url: 'bank-card',
      method: 'POST',
      data
    })

    return response
  },

  async changeCardBalance(cardId: number, data: { balance: number }) {
    const response = await axiosInstance<IFullCard>({
      url: `bank-card/${cardId}`,
      method: 'PUT',
      data
    })
  },

  async deleteCard(cardId: number) {
    const response = await axiosInstance<IFullCard>({
      url: `bank-card/${cardId}`,
      method: 'DELETE'
    })
  }
}
