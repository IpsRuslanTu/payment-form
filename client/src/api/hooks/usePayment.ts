import {useEffect, useState} from 'react'
import {PaymentStatus} from '../../model/PaymentStatus'
import {PaymentCard} from '../../model/PaymentCard'
import {PaymentApi} from '../PaymentApi'

export const usePayment = () => {
  const [status, setStatus] = useState<PaymentStatus | null>(null)
  const [pid, setPid] = useState<string | null>(null)

  const pay = (card: PaymentCard) => {
    setStatus(PaymentStatus.PROCESS)
    PaymentApi.pay(card)
      .then((res) => {
        setPid(res)
      })
      .catch(() => setStatus(PaymentStatus.FAIL))
  }

  useEffect(() => {
    let pollingTimeout: NodeJS.Timeout

    const pollPaymentStatus = async () => {
      if (!pid) {
        return
      }
      try {
        const response = await PaymentApi.checkPayment(pid)
        if (response === PaymentStatus.PROCESS) {
          pollingTimeout = setTimeout(pollPaymentStatus, 1000)
          return
        }
        setStatus(response === PaymentStatus.SUCCESS
          ? PaymentStatus.SUCCESS
          : PaymentStatus.SUCCESS)
      } catch (error) {
        setStatus(PaymentStatus.FAIL)
      }
    }

    pollPaymentStatus()

    return () => {
      clearTimeout(pollingTimeout)
    }
  }, [pid])

  return { status, pid, pay, setStatus }
}