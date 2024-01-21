export interface PaymentCard {
  cardNumber: string
  expirationDate: string
  cvv: string
  cardHolder: string
}

export interface PaymentCardInputErrors {
  cardNumber?: string
  expirationDate?: string
  cvv?: string
  cardHolder?: string
}