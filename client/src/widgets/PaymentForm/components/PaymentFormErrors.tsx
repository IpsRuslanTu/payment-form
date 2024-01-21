import React, {memo} from 'react'
import {PaymentCardInputErrors} from '../../../model/PaymentCard'
import styles from '../PaymentForm.module.scss'

interface PaymentFormErrorsProps {
  errors: PaymentCardInputErrors
}

const PaymentFormErrors = memo((props: PaymentFormErrorsProps) => {
  const {errors} = props

  const arrErrors = Object.values(errors).filter(i => i !== undefined)

  if (arrErrors.length === 0) {
    return null
  }

  return (
    <div className={styles.errors}>
      <ul>
        {arrErrors.map(i => <li key={i} >{i}</li>)}
      </ul>
    </div>
  )
})

export default PaymentFormErrors