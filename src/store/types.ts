import type { CardsState } from './bank-cards.module'
import type { CategoriesState } from './categories.module'
import type { OrdersState } from './orders.module'

export interface RootState {
  category: CategoriesState
  card: CardsState
  order: OrdersState
}
