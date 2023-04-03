import Vuex from 'vuex'
import type { StoreOptions } from 'vuex'
import categoriesModule from './categories.module'
import cardsModule from './bank-cards.module'
import orderModule from './orders.module'
import type { RootState } from './types'

const store: StoreOptions<RootState> = {
  modules: {
    category: categoriesModule,
    card: cardsModule,
    order: orderModule
  }
}

export default new Vuex.Store<RootState>(store)
