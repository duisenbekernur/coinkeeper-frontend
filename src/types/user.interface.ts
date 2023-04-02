import type { IFullCard } from './card.interface'
import type { IOrder } from './order.interface'

export interface IUser {
  name: string
  id: number
}

export interface IFullUser extends IUser {
  cards: IFullCard[]
  orders: IOrder[]
}

export interface IUserState {
  name: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}

export interface INamePassword {
  name: string
  password: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
  message: string
}
