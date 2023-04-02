import Vuex from 'vuex'
import type { StoreOptions } from 'vuex'
import categoriesModule from './categories.module'
import cardsModule from './bank-cards.module'
import type { RootState } from './types'

const store: StoreOptions<RootState> = {
  modules: {
    categories: categoriesModule,
    cards: cardsModule
  }
}

export default new Vuex.Store<RootState>(store)
