import { CardService } from '@/services/card.service'
import type { IFullCard } from '@/types/card.interface'
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
    }
  },
  actions: {
    async fetchCards({ commit }) {
      const cards = await CardService.getAllCards()

      commit('setCards', cards.data)
      // console.log('cards', this.state.cards.cards[0])
    }
  },
  getters: {
    getCards: (state) => state.cards
  }
}

export default cardsModule
