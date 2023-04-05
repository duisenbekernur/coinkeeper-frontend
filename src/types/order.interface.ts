export interface IAddOrder {
  comment: string
  cardName: string
  amount: number
  cardId: number
  categoryIds: number[]
}
export interface IOrder extends IAddOrder {
  id: number
  createdAt: string
}

export interface IOrderUpdate {
  comment: string
  cardName: string
  amount: number
  cardId: number
}
