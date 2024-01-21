import {useState} from 'react'
import PaymentForm from '../widgets/PaymentForm/PaymentForm'
import Processing from '../widgets/Proccessing/Processing'
import PaymentStatusPage from '../widgets/PaymentStatus/PaymentStatus'
import {PaymentStatus} from '../model/PaymentStatus'

const App = () => {
  const [status, setStatus] = useState<PaymentStatus | null>(null)
  const [pid, setPid] = useState<string | null>(null)

  const setTest = (a: PaymentStatus, responsePid?: string) => {
    setStatus(a)
    if (responsePid) {
      setPid(responsePid)
    }
  }

  return (
    <div className='app'>
      {(status === PaymentStatus.FAIL || status === PaymentStatus.SUCCESS) && (
        <PaymentStatusPage status={status} />
      )}
      {status === PaymentStatus.PROCESS && pid &&
          <Processing
            pid={pid}
            onOk={() => setStatus(PaymentStatus.SUCCESS)}
            onError={() => setStatus(PaymentStatus.FAIL)}
          />
      }
      {!status && <PaymentForm setPaymentStatus={setTest} />}
    </div>
  )
}

export default App