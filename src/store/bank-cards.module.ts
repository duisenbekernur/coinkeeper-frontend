import { CardService } from '@/services/card.service'
import type { ICard, IFullCard } from '@/types/card.interface'
import type { IFullUser } from '@/types/user.interface'
import type { Module } from 'vuex'

export interface CardsState {
  cards: IFullCard[]
}

const cardsModule: Module<CardsState, RootState> = {
  namespaced: true,
  state: {
    cards: []
  },
  mutations: {
    setCards(state, cards: IFullCard[]) {
      state.cards = cards
    },
    addCard(state, card: IFullCard) {
      state.cards.push(card)
    },
    deleteCard(state, cardId: number) {
      state.cards = state.cards.filter((card) => card.id !== cardId)
    }
  },
  actions: {
    async fetchCards({ commit }) {
      const cards = await CardService.getAllCards()
      commit('setCards', cards.data)
    },
    async addCard({ commit }, card: ICard) {
      const { data } = await CardService.addCard(card)
      commit('addCard', data)
    },
    async deleteCard({ commit }, cardId: number) {
      const { data } = await CardService.deleteCard(cardId)
      commit('deleteCard', cardId)
    }
  },
  getters: {
    getCards: (state) => state.cards
  }
}

export default cardsModule
