import {FormEvent, useState} from 'react'
import Input from '../../shared/ui/Input/Input'
import Button from '../../shared/ui/Button/Button'
import {PaymentCardHandler} from '../../shared/lib/PaymentCardHandler'
import {PaymentCard, PaymentCardInputErrors} from '../../model/PaymentCard'
import PaymentFormErrors from './components/PaymentFormErrors'
import styles from './PaymentForm.module.scss'

interface PaymentFormProps {
  onSubmit: (card: PaymentCard) => void
}

const PaymentForm = (props: PaymentFormProps) => {
  const {onSubmit} = props

  const [formData, setFormData] = useState<PaymentCard>({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolder: '',
  })
  const [errors, setErrors] = useState<PaymentCardInputErrors>({})

  const setCardNumber = (value: string) => {
    setFormData({...formData, cardNumber: value})
  }

  const setCVV = (value: string) => {
    setFormData({...formData, cvv: value})
  }

  const setExpirationDate = (value: string) => {
    setFormData({...formData, expirationDate: value})
  }

  const setCardHolder = (value: string) => {
    setFormData({...formData, cardHolder: value})
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = PaymentCardHandler.validateInputCard(formData)
    if (!Object.values(validationErrors).every(value => value === undefined)) {
      setErrors(validationErrors)
      return
    }

    const dto = PaymentCardHandler.prepareDataToApi(formData)
    onSubmit(dto)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Оплата банковской картой
      </h3>
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor=''>Номер карты</label>
          <Input
            value={formData.cardNumber}
            maxLength={PaymentCardHandler.cardNumberWithSpacesMaxLength}
            onChange={setCardNumber}
            filter={PaymentCardHandler.filterCardNumber}
            isWarning={!!errors.cardNumber}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.fromSection}>
            <div className={styles.miniRow}>
              <label htmlFor=''>Месяц/Год</label>
              <Input
                type='text'
                value={formData.expirationDate}
                onChange={setExpirationDate}
                filter={PaymentCardHandler.filterExpirationDate}
                maxLength={PaymentCardHandler.expirationDateMaxLength}
                isWarning={!!errors.expirationDate}
              />
            </div>
            <div className={styles.miniRow}>
              <label htmlFor=''>Код</label>
              <Input
                textAlign='center'
                type={'password'}
                value={formData.cvv}
                maxLength={PaymentCardHandler.cvvMaxLength}
                onChange={setCVV}
                filter={PaymentCardHandler.filterCVV}
                isWarning={!!errors.cvv}
              />
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor=''>Владелец карты</label>
          <Input
            value={formData.cardHolder}
            onChange={setCardHolder}
            filter={PaymentCardHandler.filterCardHolder}
            isWarning={!!errors.cardHolder}
          />
        </div>

        <Button type='submit'>Оплатить</Button>
        <PaymentFormErrors errors={errors} />
      </form>
    </div>
  )
}

export default PaymentForm