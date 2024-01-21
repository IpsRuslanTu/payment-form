import PaymentForm from '../widgets/PaymentForm/PaymentForm'
import PaymentStatusPage from '../widgets/PaymentStatus/PaymentStatus'
import {usePayment} from '../api/hooks/usePayment'

const App = () => {
  const {status, pay} = usePayment()

  return (
    <div className='app'>
      {status && <PaymentStatusPage status={status} />}
      {!status && <PaymentForm onSubmit={pay} />}
    </div>
  )
}

export default App