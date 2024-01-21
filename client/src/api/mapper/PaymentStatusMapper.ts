import {PaymentStatus} from '../../model/PaymentStatus'

export class PaymentStatusMapper {
  public static deserialize(value: string): PaymentStatus {
    switch (value) {
    case PaymentStatus.SUCCESS:
      return PaymentStatus.SUCCESS
    case PaymentStatus.PROCESS:
      return PaymentStatus.PROCESS
    default:
      throw new Error()
    }
  }
}