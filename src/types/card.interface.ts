export interface ICard {
  name: string
  balance: number
  valid: string
  expiry: string
  number: string
  csv: number
}

export interface IFullCard extends ICard {
  id: number
}
