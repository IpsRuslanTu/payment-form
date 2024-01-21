import {PaymentStatus} from '../../model/PaymentStatus'
import SuccessSvg from './../../shared/assets/Vector.svg'
import ErrorSvg from './../../shared/assets/Cross.svg'
import styles from './PaymentStatusWidget.module.scss'

interface PaymentStatusProps {
  status: PaymentStatus
}

const PaymentStatusPage = (props: PaymentStatusProps) => {
  const {status} = props

  return (
    <div className={styles.container}>
      {status === PaymentStatus.PROCESS && <>Оплата...</>}
      {status === PaymentStatus.SUCCESS && (
        <>
          Оплата прошла успешно
          <SuccessSvg />
        </>
      )}
      {status === PaymentStatus.FAIL && (
        <>
          Произошла ошибка
          <ErrorSvg />
        </>
      )}
    </div>
  )
}

export default PaymentStatusPage