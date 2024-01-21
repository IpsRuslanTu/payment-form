import {useEffect} from 'react'
import {PaymentApi} from '../../api/PaymentApi'
import styles from './Proccessing.module.scss'
import {PaymentStatus} from '../../model/PaymentStatus'

interface ProcessingProps {
  pid: string
  onOk: () => void
  onError: () => void
}

const Processing = (props: ProcessingProps) => {
  const {pid, onOk, onError} = props

  useEffect(() => {
    let pollingTimeout: NodeJS.Timeout

    const pollPaymentStatus = async () => {
      try {
        const response = await PaymentApi.checkPayment(pid)

        if (response === PaymentStatus.PROCESS) {
          pollingTimeout = setTimeout(pollPaymentStatus, 1000)
          return
        }
        if (response === PaymentStatus.SUCCESS) {
          onOk()
          return
        }
        onError()
      } catch (error) {
        onError()
      }
    }

    pollPaymentStatus()

    return () => {
      clearTimeout(pollingTimeout)
    }
  }, [pid])

  return (
    <div className={styles.container}>
      Оплата...
    </div>
  )
}

export default Processing