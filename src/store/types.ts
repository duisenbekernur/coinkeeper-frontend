import type { CardsState } from './bank-cards.module'
import type { CategoriesState } from './categories.module'

export interface RootState {
  categories: CategoriesState
  cards: CardsState
}
