import {PaymentCard} from '../../model/PaymentCard'

export class PaymentCardHandler {
  public static cardNumberMaxLength = 16
  public static cardNumberWithSpacesMaxLength = this.cardNumberMaxLength +3
  public static cvvMaxLength = 3
  public static expirationDateMaxLength = 5

  public static filterCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '')
    const arr = digits.match(/.{1,4}/g)

    return arr ? arr.join(' ') : ''
  }

  public static filterCardHolder(value: string): string {
    return value.replace(/[^a-zA-Z\s]+/, '').toUpperCase()
  }

  public static filterExpirationDate(value: string): string {
    const test = value.replace(/\D/g, '')

    return test.replace(/(\d{2})(\d{0,2})/, '$1/$2')
  }

  public static filterCVV(value: string): string {
    return value.replace(/\D/g, '')
  }

  public static prepareDataToApi(value: PaymentCard): PaymentCard {
    return {
      cardNumber: value.cardNumber.replace(/\D/g, ''),
      cvv: value.cvv,
      expirationDate: value.expirationDate,
      cardHolder: value.cardHolder
    }
  }
}