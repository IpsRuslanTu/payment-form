import {PaymentCard, PaymentCardInputErrors} from '../../model/PaymentCard'

export class PaymentCardHandler {
  public static cvvLength = 3
  public static cardNumberMinLength = 13
  public static cardNumberMaxLength = 19
  public static cardNumberWithSpacesMaxLength = this.cardNumberMaxLength + 3
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
    const digitsOnly = value.replace(/\D/g, '')

    if (digitsOnly.length <= 2) {
      return digitsOnly
    } else {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`
    }
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

  public static validateInputCard(value: PaymentCard): PaymentCardInputErrors {
    return {
      cardNumber: this.validateCardNumber(value.cardNumber),
      cvv: this.validateCVV(value.cvv),
      expirationDate: this.validateExpirationDate(value.expirationDate),
      cardHolder: this.validatePlaceholder(value.cardHolder)
    }
  }

  private static validatePlaceholder(value: string): string | undefined {
    const regex = /^\s*\w+\s+\w+\s*$/

    if (regex.test(value)) {
      return
    }

    return 'Владелец карты может состоять только из двух слов'
  }

  private static validateCardNumber(value: string): string | undefined {
    const card = value.replace(/\D/g, '')

    if (card.length >= this.cardNumberMinLength && card.length <= this.cardNumberMaxLength) {
      return
    }

    return `Номер карты должен быть от ${this.cardNumberMinLength} до ${this.cardNumberMaxLength} символов`
  }

  private static validateCVV(value: string): string | undefined {
    if (value.length === this.cvvLength) {
      return
    }

    return `Код должен состоять из ${this.cvvLength} цифр`
  }

  private static validateExpirationDate(value: string): string | undefined {
    const regex = /^(0[1-9]|1[0-2])\/(2[1-6])$/

    if (regex.test(value)) {
      return
    }

    return 'Месяц должен быть от 01 до 12, год от 21 до 26'
  }
}