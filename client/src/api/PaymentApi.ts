import {$host} from './index'
import {PaymentCard} from '../model/PaymentCard'
import {PaymentCardMapper} from './mapper/PaymentCardMapper'
import {PaymentStatus} from '../model/PaymentStatus'

export class PaymentApi {
  public static async pay(card: PaymentCard): Promise<string> {
    const apiCard = PaymentCardMapper.deserialize(card)

    const {data} = await $host.post('api',{
      jsonrpc: '2.0',
      id: '63671a5a-21d1-406d-b6b4',
      method: 'pay',
      params: apiCard
    })

    if (!data.result?.pid) {
      throw new Error(data.error)
    }

    return data.result.pid
  }

  public static async checkPayment(pid: string): Promise<PaymentStatus> {
    const {data} = await $host.get(`pay/check/${pid}`)

    switch (data.status) {
    case PaymentStatus.SUCCESS:
      return PaymentStatus.SUCCESS
    case PaymentStatus.PROCESS:
      return PaymentStatus.PROCESS
    default:
      throw new Error()
    }
  }
}