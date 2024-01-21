import {PaymentCard} from '../../model/PaymentCard'
import {ApiPaymentCard} from '../models/ApiPaymentDto'

export class PaymentCardMapper {
  public static serialize(data: PaymentCard): ApiPaymentCard {
    return {
      pan: data.cardNumber,
      cardholder: data.cardHolder,
      cvc: data.cvv,
      expire: data.expirationDate
    }
  }
}